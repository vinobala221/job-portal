# from rest_framework.serializers import ModelSerializer
# from django.contrib.auth.models import User

# class RegisterSerializers(ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password']
# from rest_framework import serializers
# from django.contrib.auth.models import User
# from .models import Job,Application,Profile
# class RegisterSerializers(serializers.ModelSerializer):

#     class Meta:
#         model = User
#         fields = ['username', 'email', 'password']
#     def create(self, validated_data):
#         user = User.objects.create_user(
#             username=validated_data['username'],
#             email=validated_data['email'],
#             password=validated_data['password']
#         )

#         return user        
# class RegisterSerializers(serializers.ModelSerializer):

#     role = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = [
#             "username",
#             "email",
#             "password",
#             "role"
#         ]

#     def create(self, validated_data):

#         role = validated_data.pop("role")

#         user = User.objects.create_user(
#             username=validated_data["username"],
#             email=validated_data["email"],
#             password=validated_data["password"]
#         )

#         Profile.objects.create(
#             user=user,
#             role=role
#         )

#         return user

# class JobSerializers(serializers.ModelSerializer):
#     created_by = serializers.StringRelatedField()

#     class Meta:
#         model = Job
#         fields = "__all__"
#         read_only_fields = ["created_by", "posted_on"]


# # class ApplicationSerializers(serializers.ModelSerializer):
# #     job_details = JobSerializers(source="job", read_only=True)

# #     class Meta:
# #         model = Application
# #         fields = "__all__"
# #         read_only_fields = ["applicant", "applied_on", "job_details"]
# class ApplicationSerializers(serializers.ModelSerializer):

#     job_title = serializers.CharField(
#         source="job.title",
#         read_only=True
#     )

#     company = serializers.CharField(
#         source="job.company",
#         read_only=True
#     )

#     location = serializers.CharField(
#         source="job.location",
#         read_only=True
#     )

#     class Meta:
#         model = Application
#         fields = [
#             "id",
#             "job",
#             "job_title",
#             "company",
#             "location",
#             "status",
#             "applied_on",
#             "applicant",
#         ]

#         read_only_fields = [
#             "applicant",
#             "status",
#             "applied_on",
#         ]


# from rest_framework import serializers
# from django.contrib.auth.models import User
# from .models import Job, Application, Profile


# class RegisterSerializers(serializers.ModelSerializer):
#     role = serializers.CharField(write_only=True, required=False, default="candidate")

#     class Meta:
#         model = User
#         fields = [
#             "username",
#             "email",
#             "password",
#             "role"
#         ]
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }

#     def create(self, validated_data):
#         role = validated_data.pop("role", "candidate")

#         user = User.objects.create_user(
#             username=validated_data["username"],
#             email=validated_data.get("email", ""),
#             password=validated_data["password"]
#         )

#         Profile.objects.create(
#             user=user,
#             role=role
#         )

#         return user


# class JobSerializers(serializers.ModelSerializer):
#     created_by = serializers.StringRelatedField()

#     class Meta:
#         model = Job
#         fields = "__all__"
#         read_only_fields = ["created_by", "posted_on"]


# class ApplicationSerializers(serializers.ModelSerializer):
#     job_title = serializers.CharField(
#         source="job.title",
#         read_only=True
#     )

#     company = serializers.CharField(
#         source="job.company",
#         read_only=True
#     )

#     location = serializers.CharField(
#         source="job.location",
#         read_only=True
#     )

#     applicant_username = serializers.CharField(
#         source="applicant.username",
#         read_only=True
#     )

#     class Meta:
#         model = Application
#         fields = [
#             "id",
#             "job",
#             "job_title",
#             "company",
#             "location",
#             "status",
#             "applied_on",
#             "applicant",
#             "applicant_username",
#         ]

#         read_only_fields = [
#             "applicant",
#             "status",
#             "applied_on",
#         ]

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Job, Application, Profile,Resume

# 1. User Register Serializer
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


# 3. Candidate / Recruiter விவரங்களுக்கான Simple Serializer
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