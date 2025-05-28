from rest_framework import serializers
from myapp.models import Customer, Deliveryman, Homemaker, Admin, Order, Payment, Survey, SurveyDetails
import datetime
import bcrypt
from mongoengine import *

class CustomerSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(max_length=100, allow_blank=True, required=False)
    contact = serializers.CharField(max_length=20, allow_blank=True, required=False)
    addresses = serializers.ListField(required=False)
    customer_type = serializers.CharField(required=False, default='Regular')  # <-- Include this line

    def create(self, validated_data):
        raw_password = validated_data.pop('password')
        hashed_password = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        customer = Customer(
            username=validated_data['username'],
            email=validated_data['email'],
            password=hashed_password,
            first_name=validated_data.get('first_name', ''),
            contact=validated_data.get('contact', ''),
            addresses=validated_data.get('addresses', []),
            customer_type=validated_data.get('customer_type', 'Regular'),  # <-- Default to Regular
            date_joined=datetime.datetime.utcnow()
        )
        customer.save()
        return customer

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.contact = validated_data.get('contact', instance.contact)
        instance.customer_type = validated_data.get('customer_type', instance.customer_type)
        instance.addresses = validated_data.get('addresses', instance.addresses)

        if password:
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            instance.password = hashed_password

        instance.save()
        return instance

class DeliverymanSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)  # ✅ Add this to expose MongoDB _id
    username = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(max_length=100, allow_blank=True, required=False)
    contact = serializers.CharField(max_length=20, allow_blank=True, required=False)

    def create(self, validated_data):
        raw_password = validated_data.pop('password')
        hashed_password = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        deliveryman = Deliveryman(
            username=validated_data['username'],
            email=validated_data['email'],
            password=hashed_password,  # ✅ already decoded
            first_name=validated_data.get('first_name', ''),
            contact=validated_data.get('contact', ''),
            date_joined=datetime.datetime.utcnow()
        )
        deliveryman.save()
        return deliveryman

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.contact = validated_data.get('contact', instance.contact)

        if password:
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            instance.password = hashed_password  # ✅ fixed

        instance.save()
        return instance


class HomemakerSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    home_maker_name = serializers.CharField()
    gender = serializers.CharField()
    contact_no = serializers.CharField()
    email = serializers.EmailField()
    address = serializers.CharField()
    landmark_city_state = serializers.CharField()
    pincode = serializers.CharField()
    no_of_meals_per_day = serializers.IntegerField()
    survey_status = serializers.CharField()
    password = serializers.CharField(write_only=True)

class AdminSerializer(serializers.Serializer):
    userId = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    name = serializers.CharField(max_length=100, allow_blank=True, required=False)
    contact = serializers.IntegerField(allow_null=True, required=False)
    location = serializers.CharField(max_length=200, allow_blank=True, required=False)


    def create(self, validated_data):
        password = validated_data.pop('password').encode('utf-8')
        hashed_password = bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')
        admin = Admin(
            userId=validated_data['userId'],
            email=validated_data['email'],
            password=hashed_password.decode('utf-8'),
            name=validated_data.get('name', ''),
            contact=validated_data.get('contact', None),
            location=validated_data.get('location', ''),
            date_joined=datetime.datetime.utcnow(),
            is_superuser=True,
            is_staff=True,
            is_active=True
        )
        admin.save()
        return admin

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        instance.userId = validated_data.get('userId', instance.userId)
        instance.email = validated_data.get('email', instance.email)
        instance.name = validated_data.get('name', instance.name)
        instance.contact = validated_data.get('contact', instance.contact)
        instance.location = validated_data.get('location', instance.location)
        if password:
            password = password.encode('utf-8')
            hashed_password = bcrypt.hashpw(password, bcrypt.gensalt()).decode('utf-8')
            instance.password = hashed_password.decode('utf-8')
        instance.save()
        return instance

class OrderSerializer(serializers.Serializer):
    customer = serializers.CharField()
    home_maker = serializers.CharField()
    deliveryman = serializers.CharField(allow_blank=True, required=False)
    items = serializers.ListField(child=serializers.CharField())
    total_amount = serializers.IntegerField()
    order_date = serializers.DateTimeField()
    delivery_date = serializers.DateTimeField()
    status = serializers.CharField()

    def create(self, validated_data):
        return Order.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class PaymentSerializer(serializers.Serializer):
    order = serializers.CharField()
    amount = serializers.IntegerField()
    payment_date = serializers.DateTimeField()
    payment_method = serializers.CharField()
    transaction_id = serializers.CharField()

    def create(self, validated_data):
        return Payment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class SurveyDetailsSerializer(serializers.Serializer):
    doneBy = serializers.CharField(max_length=255, required=False, allow_null=True)
    hygiene = serializers.IntegerField(required=False, allow_null=True)
    kitchenImages = serializers.ListField(child=serializers.CharField(max_length=200), required=False, allow_null=True)
    foodTaste = serializers.IntegerField(required=False, allow_null=True)
    foodImages = serializers.ListField(child=serializers.CharField(max_length=200), required=False, allow_null=True)
    maxMeals = serializers.IntegerField(required=False, allow_null=True)
    mealType = serializers.ChoiceField(choices=[('Veg Only', 'Veg Only'), ('Non-Veg Only', 'Non-Veg Only'), ('Both', 'Both')], required=False, allow_null=True)
    approvedDate = serializers.DateField(required=False, allow_null=True)



class SurveySerializer(serializers.Serializer):
    home_maker_name = serializers.CharField(max_length=255)
    gender = serializers.CharField(max_length=10)
    contact_no = serializers.CharField(max_length=15)
    email = serializers.EmailField()
    address = serializers.CharField(max_length=255)
    landmark_city_state = serializers.CharField(max_length=255)
    pincode = serializers.CharField(max_length=10)
    no_of_meals_per_day = serializers.IntegerField()
    survey_date = serializers.DateTimeField(required=False)
    survey_status = serializers.CharField(max_length=20, required=False)
    submitted_at = serializers.DateTimeField(required=False)
    surveyDetails = SurveyDetailsSerializer(required=False, allow_null=True)

    def create(self, validated_data):
        survey_details_data = validated_data.pop('surveyDetails', None)
        survey = Survey.objects.create(**validated_data)
        if survey_details_data:
            Survey.objects.filter(id=survey.id).update(surveyDetails=survey_details_data)
        return survey

    def update(self, instance, validated_data):
        survey_details_data = validated_data.pop('surveyDetails', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if survey_details_data:
            Survey.objects.filter(id=instance.id).update(surveyDetails=survey_details_data)
        return instance