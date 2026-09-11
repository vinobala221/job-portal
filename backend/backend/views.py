# from django.contrib.auth.models import User
# from django.contrib.auth import authenticate
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework import status

# from .models import Job, Application
# from .serializers import RegisterSerializers, JobSerializers, ApplicationSerializers


# @api_view(['POST'])
# def register_user(request):
#     serializer = RegisterSerializers(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(
#             {"message": "User registered successfully!"},
#             status=status.HTTP_201_CREATED
#         )
#     return Response(
#         serializer.errors,
#         status=status.HTTP_400_BAD_REQUEST
#     )


# @api_view(['GET'])
# def job_list(request):
#     jobs = Job.objects.all().order_by('-posted_on') # Latests jobs first
#     serializer = JobSerializers(jobs, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def apply_job(request):
#     # Safe Profile Check for Candidate Role
#     user_profile = getattr(request.user, 'profile', None)
#     if user_profile and user_profile.role == "recruiter":
#         return Response(
#             {"message": "Recruiters cannot apply for jobs"},
#             status=status.HTTP_403_FORBIDDEN
#         )

#     job_id = request.data.get("job")
#     applicant = request.user

#     if Application.objects.filter(job_id=job_id, applicant=applicant).exists():
#         return Response(
#             {"message": "You already have applied for this job"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     serializer = ApplicationSerializers(data=request.data)
#     if serializer.is_valid():
#         serializer.save(applicant=applicant)
#         return Response(
#             {"message": "Application Submitted Successfully"},
#             status=status.HTTP_201_CREATED
#         )
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# # 1. ADD / CREATE JOB (POST)
# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_job(request):
#     user_profile = getattr(request.user, 'profile', None)
#     if not user_profile or user_profile.role != "recruiter":
#         return Response(
#             {"message": "Only recruiters can create jobs"},
#             status=status.HTTP_403_FORBIDDEN
#         )

#     serializer = JobSerializers(data=request.data)
#     if serializer.is_valid():
#         serializer.save(created_by=request.user)
#         return Response(
#             {"message": "Job created successfully", "job": serializer.data},
#             status=status.HTTP_201_CREATED
#         )
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# # 2. EDIT / UPDATE JOB (PUT)
# @api_view(["PUT"])
# @permission_classes([IsAuthenticated])
# def edit_job(request, job_id):
#     user_profile = getattr(request.user, 'profile', None)
#     if not user_profile or user_profile.role != "recruiter":
#         return Response(
#             {"message": "Only recruiters can edit jobs"},
#             status=status.HTTP_403_FORBIDDEN
#         )

#     try:
#         job = Job.objects.get(id=job_id, created_by=request.user)
#     except Job.DoesNotExist:
#         return Response(
#             {"message": "Job not found or unauthorized"},
#             status=status.HTTP_404_NOT_FOUND
#         )

#     serializer = JobSerializers(job, data=request.data, partial=True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(
#             {"message": "Job updated successfully", "job": serializer.data},
#             status=status.HTTP_200_OK
#         )
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# # 3. DELETE JOB (DELETE)
# @api_view(["DELETE"])
# @permission_classes([IsAuthenticated])
# def delete_job(request, job_id):
#     user_profile = getattr(request.user, 'profile', None)
#     if not user_profile or user_profile.role != "recruiter":
#         return Response(
#             {"message": "Only recruiters can delete jobs"},
#             status=status.HTTP_403_FORBIDDEN
#         )

#     try:
#         job = Job.objects.get(id=job_id, created_by=request.user)
#     except Job.DoesNotExist:
#         return Response(
#             {"message": "Job not found or unauthorized"},
#             status=status.HTTP_404_NOT_FOUND
#         )

#     job.delete()
#     return Response(
#         {"message": "Job deleted successfully"},
#         status=status.HTTP_200_OK
#     )


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def my_applications(request):
#     applications = Application.objects.filter(
#         applicant=request.user
#     ).order_by('-applied_on')

#     serializer = ApplicationSerializers(
#         applications,
#         many=True
#     )

#     return Response(
#         serializer.data,
#         status=status.HTTP_200_OK
#     )


# # @api_view(["GET"])
# # @permission_classes([IsAuthenticated])
# # def recruiter_applications(request):
# #     user_profile = getattr(request.user, 'profile', None)
# #     if not user_profile or user_profile.role != "recruiter":
# #         return Response(
# #             {"message": "Only recruiters can view received applications"},
# #             status=status.HTTP_403_FORBIDDEN
# #         )

# #     applications = Application.objects.filter(
# #         job__created_by=request.user
# #     ).select_related(
# #         "job",
# #         "applicant"
# #     ).order_by('-applied_on')

# #     data = []
# #     for application in applications:
# #         data.append({
# #             "id": application.id,
# #             "job": application.job.title,
# #             "candidate": application.applicant.username,
# #             "email": application.applicant.email,
# #             "status": application.status,
# #             "applied_on": application.applied_on,
# #         })

# #     return Response(data, status=status.HTTP_200_OK)


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def recruiter_applications(request):

#     user_profile = getattr(request.user, 'profile', None)

#     if not user_profile or user_profile.role != "recruiter":
#         return Response(
#             {"message": "Only recruiters can view applications"},
#             status=status.HTTP_403_FORBIDDEN
#         )

#     applications = Application.objects.filter(
#         job__created_by=request.user
#     ).select_related(
#         "job",
#         "applicant"
#     ).order_by("-applied_on")

#     data = []

#     for application in applications:
#         data.append({
#             "id": application.id,
#             "job": application.job.title,
#             "candidate": application.applicant.username,
#             "email": application.applicant.email,
#             "status": application.status,
#             "applied_on": application.applied_on,
#         })

#     return Response(data, status=status.HTTP_200_OK)


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def create_job(request):

#     user_profile = getattr(request.user, 'profile', None)

#     if not user_profile or user_profile.role != "recruiter":
#         return Response(
#             {"message": "Only recruiters can create jobs"},
#             status=status.HTTP_403_FORBIDDEN
#         )

#     serializer = JobSerializers(data=request.data)

#     if serializer.is_valid():
#         serializer.save(created_by=request.user)

#         return Response(
#             {
#                 "message": "Job created successfully",
#                 "job": serializer.data
#             },
#             status=status.HTTP_201_CREATED
#         )

#     return Response(
#         serializer.errors,
#         status=status.HTTP_400_BAD_REQUEST
#     )

# # views.py - Add status update endpoint
# @api_view(["PATCH"])
# @permission_classes([IsAuthenticated])
# def update_application_status(request, app_id):
#     if getattr(request.user, 'profile', None) and request.user.profile.role != "recruiter":
#         return Response({"message": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

#     try:
#         application = Application.objects.get(id=app_id, job__created_by=request.user)
#     except Application.DoesNotExist:
#         return Response({"message": "Application not found"}, status=status.HTTP_404_NOT_FOUND)

#     status_val = request.data.get("status")
#     if status_val in ["shortlisted", "rejected", "pending"]:
#         application.status = status_val
#         application.save()
#         return Response({"message": f"Application status updated to {status_val}"}, status=status.HTTP_200_OK)

#     return Response({"message": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def recruiter_jobs(request):

#     user_profile = getattr(request.user, 'profile', None)

#     if not user_profile or user_profile.role != "recruiter":
#         return Response(
#             {"message": "Only recruiters can view their jobs"},
#             status=status.HTTP_403_FORBIDDEN
#         )

#     jobs = Job.objects.filter(
#         created_by=request.user
#     ).order_by("-posted_on")

#     serializer = JobSerializers(
#         jobs,
#         many=True
#     )

#     return Response(
#         serializer.data,
#         status=status.HTTP_200_OK
#     )


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Job, Application,Resume
from .serializers import (
    RegisterSerializers,
    JobSerializers,
    ApplicationSerializers,
    ResumeSerializers,
    
)


# =========================
# REGISTER USER
# =========================
@api_view(["POST"])
def register_user(request):
    serializer = RegisterSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "User registered successfully!"},
            status=status.HTTP_201_CREATED
        )
    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# =========================
# ALL JOBS - CANDIDATE
# =========================
@api_view(["GET"])
def job_list(request):
    jobs = Job.objects.all().order_by("-posted_on")
    serializer = JobSerializers(jobs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# =========================
# APPLY JOB - CANDIDATE
# =========================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def apply_job(request):
    user_profile = getattr(request.user, "profile", None)

    # Recruiter cannot apply
    if user_profile and user_profile.role == "recruiter":
        return Response(
            {"message": "Recruiters cannot apply for jobs"},
            status=status.HTTP_403_FORBIDDEN
        )

    job_id = request.data.get("job")

    if not job_id:
        return Response(
            {"message": "Job ID is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Check duplicate application
    if Application.objects.filter(job_id=job_id, applicant=request.user).exists():
        return Response(
            {"message": "You already applied for this job"},
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = ApplicationSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save(applicant=request.user)
        return Response(
            {"message": "Application Submitted Successfully"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# CREATE JOB - RECRUITER
# =========================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_job(request):
    user_profile = getattr(request.user, "profile", None)

    if not user_profile or user_profile.role != "recruiter":
        return Response(
            {"message": "Only recruiters can create jobs"},
            status=status.HTTP_403_FORBIDDEN
        )

    serializer = JobSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response(
            {
                "message": "Job created successfully",
                "job": serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# RECRUITER'S OWN JOBS
# =========================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def recruiter_jobs(request):
    user_profile = getattr(request.user, "profile", None)

    if not user_profile or user_profile.role != "recruiter":
        return Response(
            {"message": "Only recruiters can view their jobs"},
            status=status.HTTP_403_FORBIDDEN
        )

    jobs = Job.objects.filter(created_by=request.user).order_by("-posted_on")
    serializer = JobSerializers(jobs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# =========================
# EDIT JOB - RECRUITER
# =========================
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def edit_job(request, job_id):
    user_profile = getattr(request.user, "profile", None)

    if not user_profile or user_profile.role != "recruiter":
        return Response(
            {"message": "Only recruiters can edit jobs"},
            status=status.HTTP_403_FORBIDDEN
        )

    try:
        job = Job.objects.get(id=job_id, created_by=request.user)
    except Job.DoesNotExist:
        return Response(
            {"message": "Job not found or unauthorized"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = JobSerializers(job, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                "message": "Job updated successfully",
                "job": serializer.data
            },
            status=status.HTTP_200_OK
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# DELETE JOB - RECRUITER
# =========================
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_job(request, job_id):
    user_profile = getattr(request.user, "profile", None)

    if not user_profile or user_profile.role != "recruiter":
        return Response(
            {"message": "Only recruiters can delete jobs"},
            status=status.HTTP_403_FORBIDDEN
        )

    try:
        job = Job.objects.get(id=job_id, created_by=request.user)
    except Job.DoesNotExist:
        return Response(
            {"message": "Job not found or unauthorized"},
            status=status.HTTP_404_NOT_FOUND
        )

    job.delete()
    return Response(
        {"message": "Job deleted successfully"},
        status=status.HTTP_200_OK
    )


# =========================
# CANDIDATE APPLICATIONS
# =========================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_applications(request):
    applications = Application.objects.filter(applicant=request.user).order_by("-applied_on")
    serializer = ApplicationSerializers(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# =========================
# RECRUITER APPLICATIONS (SERIALIZER திருத்தம்)
# =========================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def recruiter_applications(request):
    user_profile = getattr(request.user, "profile", None)

    if not user_profile or user_profile.role != "recruiter":
        return Response(
            {"message": "Only recruiters can view applications"},
            status=status.HTTP_403_FORBIDDEN
        )

    applications = Application.objects.filter(
        job__created_by=request.user
    ).select_related("job", "applicant").order_by("-applied_on")

    # ApplicationSerializers பயன்படுத்தி அனுப்பினால் frontend-ல் கையாள எளிதாக இருக்கும்
    serializer = ApplicationSerializers(applications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# =========================
# RECRUITER DASHBOARD STATS (புதிய API)
# =========================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def recruiter_stats(request):
    user_profile = getattr(request.user, "profile", None)

    if not user_profile or user_profile.role != "recruiter":
        return Response(
            {"message": "Unauthorized"},
            status=status.HTTP_403_FORBIDDEN
        )

    total_jobs = Job.objects.filter(created_by=request.user).count()
    applications = Application.objects.filter(job__created_by=request.user)
    
    return Response({
        "total_jobs": total_jobs,
        "total_applications": applications.count(),
        "shortlisted": applications.filter(status="shortlisted").count(),
        "hired": applications.filter(status="hired").count(),
    }, status=status.HTTP_200_OK)


# =========================
# UPDATE APPLICATION STATUS
# =========================
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_application_status(request, app_id):
    user_profile = getattr(request.user, "profile", None)

    if not user_profile or user_profile.role != "recruiter":
        return Response(
            {"message": "Unauthorized"},
            status=status.HTTP_403_FORBIDDEN
        )

    try:
        application = Application.objects.get(
            id=app_id,
            job__created_by=request.user
        )
    except Application.DoesNotExist:
        return Response(
            {"message": "Application not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    status_value = request.data.get("status")

    if status_value not in ["pending", "shortlisted", "rejected", "hired"]:
        return Response(
            {"message": "Invalid status"},
            status=status.HTTP_400_BAD_REQUEST
        )

    application.status = status_value
    application.save()

    return Response(
        {"message": f"Application status updated to {status_value}"},
        status=status.HTTP_200_OK
    )

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def upload_resume(request):

    resume_file = request.FILES.get("resume")

    if not resume_file:
        return Response(
            {"message": "Please upload a resume"},
            status=status.HTTP_400_BAD_REQUEST
        )

    resume, created = Resume.objects.get_or_create(
        user=request.user
    )

    resume.resume = resume_file
    resume.save()

    serializer = ResumeSerializers(resume)

    return Response(
        {
            "message": "Resume uploaded successfully",
            "resume": serializer.data
        },
        status=status.HTTP_200_OK
    )