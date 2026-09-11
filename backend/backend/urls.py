# from django.contrib import admin
# from django.urls import path
# from .views import register_user,job_list,apply_job,create_job,edit_job,delete_job
# from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

# urlpatterns = [
#     path('admin/', admin.site.urls),
   
#     path('register/',register_user),
#     path('login/', TokenObtainPairView.as_view()),
#     path('token/refresh/', TokenRefreshView.as_view()),
#     path('jobs/',job_list),
#     path('apply/',apply_job),
#     path("jobs/create/",create_job, name="create_job"),
#     path("jobs/<int:job_id>/edit/",edit_job, name="edit_job"),
#     path("jobs/<int:job_id>/delete/",delete_job, name="delete_job")
# ]
# from django.contrib import admin
# from django.urls import path
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from .views import (
#     register_user,
#     job_list,
#     apply_job,
#     create_job,
#     edit_job,
#     delete_job,my_applications,
#      recruiter_applications
# )

# urlpatterns = [
#     path('admin/', admin.site.urls),
    
#     path('register/', register_user),
#     path('login/', TokenObtainPairView.as_view()),
#     path('token/refresh/', TokenRefreshView.as_view()),
    
#     path('jobs/', job_list),
#     path('apply/', apply_job),
    
#     path("jobs/create/", create_job, name="create_job"),
#     path("jobs/<int:job_id>/edit/", edit_job, name="edit_job"),
#     path("jobs/<int:job_id>/delete/", delete_job, name="delete_job"),
#     path("my-applications/", my_applications, name="my_applications"),
#     path(
#     'recruiter/applications/',
#     recruiter_applications
# ),
# ]


# from django.contrib import admin
# from django.urls import path
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from .views import (
#     register_user,
#     job_list,
#     apply_job,
#     create_job,
#     edit_job,
#     delete_job,
#     my_applications,
#     recruiter_applications
# )

# urlpatterns = [
#     path('admin/', admin.site.urls),
    
#     path('register/', register_user, name='register'),
#     path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
#     path('jobs/', job_list, name='job_list'),
#     path('apply/', apply_job, name='apply_job'),
#     path('my-applications/', my_applications, name='my_applications'),
    
#     path('jobs/create/', create_job, name='create_job'),
#     path('jobs/<int:job_id>/edit/', edit_job, name='edit_job'),
#     path('jobs/<int:job_id>/delete/', delete_job, name='delete_job'),
#     path('recruiter/applications/', recruiter_applications, name='recruiter_applications'),
# ]


from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    register_user,
    job_list,
    apply_job,
    create_job,
    edit_job,
    delete_job,
    my_applications,
    recruiter_applications,
    update_application_status,
    recruiter_jobs,
    recruiter_stats,  
    upload_resume,
    
)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # Auth Endpoints
    path('register/', register_user, name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Candidate Endpoints
    path('jobs/', job_list, name='job_list'),
    path('apply/', apply_job, name='apply_job'),
    path('my-applications/', my_applications, name='my_applications'),
    
    # Recruiter Endpoints
    path('jobs/create/', create_job, name='create_job'),
    path('jobs/<int:job_id>/edit/', edit_job, name='edit_job'),
    path('jobs/<int:job_id>/delete/', delete_job, name='delete_job'),
    path('recruiter/jobs/', recruiter_jobs, name='recruiter_jobs'),
    path('recruiter/applications/', recruiter_applications, name='recruiter_applications'),
    path('recruiter/stats/', recruiter_stats, name='recruiter_stats'),   
    path('applications/<int:app_id>/status/', update_application_status, name='update_status'),

    path(
        "resume/upload/",
        upload_resume,
        name="upload_resume"
    ),


]
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )