from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "password")
        extra_kwargs = {
            "first_name": {"required": True},
            "last_name": {"required": True},
        }

    def create(self, validated_data):
        email = validated_data["email"]
        username_base = email.split("@")[0]
        username = username_base
        suffix = 1

        while User.objects.filter(username=username).exists():
            username = f"{username_base}{suffix}"
            suffix += 1

        user = User.objects.create_user(
            username=username,
            first_name=validated_data.get("first_name", ""),
            last_name=validated_data.get("last_name", ""),
            email=email,
            password=validated_data["password"],
            is_active=False,
        )
        return user


class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "email")


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)
