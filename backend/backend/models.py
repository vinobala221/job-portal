# # from django.db import models
# # from django.contrib.auth.models import User

# # class Profile(models.Model):
# #     ROLE_CHOICES = (
# #         ("candidate", "Candidate"),
# #         ("recruiter", "Recruiter"),
# #     )

# #     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
# #     role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="candidate")

# #     def __str__(self):
# #         return f"{self.user.username} - {self.role}"

# # class Profile(models.Model):

# #     ROLE_CHOICES = (
# #         ("candidate", "Candidate"),
# #         ("recruiter", "Recruiter"),
# #     )

# #     user = models.OneToOneField(
# #         User,
# #         on_delete=models.CASCADE
# #     )

# #     role = models.CharField(
# #         max_length=20,
# #         choices=ROLE_CHOICES,
# #         default="candidate"
# #     )

# #     def __str__(self):
# #         return f"{self.user.username} - {self.role}"
    
# # class Job(models.Model):
# #     title=models.CharField(max_length=200)
# #     description=models.TextField()
# #     company=models.CharField(max_length=100)
# #     location=models.CharField(max_length=100)
# #     salary_range=models.CharField(max_length=50,blank=True)
# #     posted_on=models.DateTimeField(auto_now_add=True)
# #     created_by=models.ForeignKey(User, on_delete= models.CASCADE)

# # class Application(models.Model):
# #     STATUS_CHOICES =(
# #       ('pending','Pending'),
# #       ('shortlisted','Shortlisted'),
# #       ('rejected','Rejected'),
# #       ('hired','Hired')

# #     )
# #     job=models.ForeignKey(Job,on_delete=models.CASCADE)
# #     applicant = models.ForeignKey(User, on_delete=models.CASCADE)
# #     status=models.CharField(max_length=20,choices=STATUS_CHOICES,default="pending")
# #     applied_on=models.DateTimeField(auto_now_add=True)

# from django.db import models
# from django.contrib.auth.models import User

# class Profile(models.Model):
#     ROLE_CHOICES = (
#         ("candidate", "Candidate"),
#         ("recruiter", "Recruiter"),
#     )

#     user = models.OneToOneField(
#         User, 
#         on_delete=models.CASCADE, 
#         related_name="profile"
#     )

#     role = models.CharField(
#         max_length=20,
#         choices=ROLE_CHOICES,
#         default="candidate"
#     )

#     def __str__(self):
#         return f"{self.user.username} - {self.role}"


# class Job(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField()
#     company = models.CharField(max_length=100)
#     location = models.CharField(max_length=100)
#     salary_range = models.CharField(max_length=50, blank=True)
#     posted_on = models.DateTimeField(auto_now_add=True)
    
#     created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="jobs")

#     def __str__(self):
#         return f"{self.title} - {self.company}"


# class Application(models.Model):
#     STATUS_CHOICES = (
#         ('pending', 'Pending'),
#         ('shortlisted', 'Shortlisted'),
#         ('rejected', 'Rejected'),
#         ('hired', 'Hired')
#     )

#     job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
#     applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name="applications")
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
#     applied_on = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.applicant.username} - {self.job.title} ({self.status})"

from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):

    ROLE_CHOICES = (
        ("candidate", "Candidate"),
        ("recruiter", "Recruiter"),
    )

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="candidate"
    )

    def __str__(self):
        return f"{self.user.username} - {self.role}"


class Job(models.Model):

    title = models.CharField(max_length=200)

    description = models.TextField()

    company = models.CharField(max_length=100)

    location = models.CharField(max_length=100)

    salary_range = models.CharField(
        max_length=50,
        blank=True
    )

    job_type = models.CharField(
        max_length=50,
        default="Full Time"
    )

    posted_on = models.DateTimeField(
        auto_now_add=True
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="jobs"
    )

    def __str__(self):
        return f"{self.title} - {self.company}"


class Application(models.Model):

    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("shortlisted", "Shortlisted"),
        ("rejected", "Rejected"),
        ("hired", "Hired"),
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    applicant = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="applications"
    )

    resume = models.FileField(
        upload_to="resumes/",
        null=True,      
        blank=True     
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    applied_on = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        unique_together = ("job", "applicant")

    def __str__(self):
        return f"{self.applicant.username} - {self.job.title} ({self.status})"

class Resume(models.Model):
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name="resume"
    )
    resume = models.FileField(upload_to="resumes/")
    uploaded_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Resume"