from django.conf import settings
from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)

from .serializers import RegisterSerializer, UserMeSerializer

class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class MeView(RetrieveAPIView):
    serializer_class = UserMeSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


def set_refresh_cookie(response, refresh_token):
    max_age = int(settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds())
    response.set_cookie(
        settings.JWT_REFRESH_COOKIE_NAME,
        refresh_token,
        httponly=True,
        secure=settings.JWT_REFRESH_COOKIE_SECURE,
        samesite=settings.JWT_REFRESH_COOKIE_SAMESITE,
        path=settings.JWT_REFRESH_COOKIE_PATH,
        max_age=max_age,
    )


def clear_refresh_cookie(response):
    response.delete_cookie(
        settings.JWT_REFRESH_COOKIE_NAME,
        path=settings.JWT_REFRESH_COOKIE_PATH,
        samesite=settings.JWT_REFRESH_COOKIE_SAMESITE,
    )


class CookieTokenObtainPairView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = TokenObtainPairSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        access = serializer.validated_data["access"]
        refresh = serializer.validated_data["refresh"]

        response = Response({"access": access}, status=status.HTTP_200_OK)
        set_refresh_cookie(response, refresh)
        return response


class CookieTokenRefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh = request.COOKIES.get(settings.JWT_REFRESH_COOKIE_NAME)

        if not refresh:
            return Response(
                {"detail": "Refresh token missing."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = TokenRefreshSerializer(data={"refresh": refresh})
        serializer.is_valid(raise_exception=True)

        access = serializer.validated_data["access"]
        response = Response({"access": access}, status=status.HTTP_200_OK)

        new_refresh = serializer.validated_data.get("refresh")
        if new_refresh:
            set_refresh_cookie(response, new_refresh)

        return response


class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        clear_refresh_cookie(response)
        return response
