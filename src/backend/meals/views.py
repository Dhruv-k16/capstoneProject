from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Meal, Order
from .serializers import MealSerializer, OrderSerializer
import stripe
from django.conf import settings

class MealListView(generics.ListCreateAPIView):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    meal_id = request.data.get('meal_id')

    try:
        meal = Meal.objects.get(id=meal_id)
        order = Order.objects.create(user=user, meal=meal, status="Pending")
        return Response({"message": "Order placed successfully", "order_id": order.id})
    except Meal.DoesNotExist:
        return Response({"error": "Meal not found"}, status=400)

@api_view(['POST'])
def create_payment(request):
    stripe.api_key = settings.STRIPE_SECRET_KEY
    intent = stripe.PaymentIntent.create(
        amount=5000,  # Example amount in cents
        currency='usd'
    )
    return Response({'client_secret': intent['client_secret']})
