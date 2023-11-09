from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from django.core.exceptions import ValidationError


# Custom exception handlers

class CustomExceptionHandlerMixin:
    def get_object_or_404(self, queryset, **kwargs):
        try:
            return queryset.get(**kwargs)
        except (queryset.model.DoesNotExist, ValidationError) as e:
            raise NotFound() from e

    def handle_exception(self, exc):
        response = super().handle_exception(exc)

        if isinstance(exc, NotFound):
            model_name = self.queryset.model.__name__
            response.data = {"message": f"{model_name} not found"}

        return response
