

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Job, Application, Profile,Resume

class RegisterSerializers(serializers.ModelSerializer):
    role = serializers.CharField(write_only=True, required=False, default="candidate")

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "role"
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        role = validated_data.pop("role", "candidate")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"]
        )

        Profile.objects.create(
            user=user,
            role=role
        )

        return user


# 2. Job Serializer
class JobSerializers(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField()

    class Meta:
        model = Job
        fields = "__all__"
        read_only_fields = ["created_by", "posted_on"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class ApplicationSerializers(serializers.ModelSerializer):

    job_details = JobSerializers(
        source="job",
        read_only=True
    )

    applicant_details = UserSerializer(
        source="applicant",
        read_only=True
    )

    class Meta:
        model = Application
        fields = [
            "id",
            "job",
            "job_details",
            "applicant",
            "applicant_details",
            "resume",
            "status",
            "applied_on",
        ]

        read_only_fields = [
            "applicant",
            "status",
            "applied_on",
        ]

class ResumeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ["id", "user", "resume", "uploaded_at"]
        read_only_fields = ["user", "uploaded_at"]
