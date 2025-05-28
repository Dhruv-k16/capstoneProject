from rest_framework.decorators import api_view,parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django.core.files.storage import default_storage
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from myapp.models import (
    Customer,
    Deliveryman,
    Homemaker,
    Admin,
    Order,
    Payment,
    OTP,
    Survey,
    SurveyDetails,
)
from myapp.serializers import (
    CustomerSerializer,
    DeliverymanSerializer,
    HomemakerSerializer,
    AdminSerializer,
    OrderSerializer,
    PaymentSerializer,
    SurveySerializer,  # Import SurveySerializer
)  # Import SurveyDetailsSerializer
import bcrypt
import jwt
import os
from datetime import datetime, timedelta
from django.conf import settings
import random
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from bson.json_util import dumps
from mongoengine.errors import ValidationError, DoesNotExist
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist # Import the correct exception
from bson import ObjectId


def generate_otp():
    """Generate a 6-digit OTP."""
    return str(random.randint(100000, 999999))


OTP_EXPIRATION_SECONDS = 300  # 5 minutes


# Helper function for common user logic
def get_user_object(user_type, email):
    """
    Retrieve a user object based on user type and email.

    Handles case-insensitive email matching.  Uses get() and handles exceptions.
    """
    email = email.lower().strip()
    try:
        if user_type == "customer":
            return Customer.objects.get(email__iexact=email)
        elif user_type == "deliveryman":
            return Deliveryman.objects.get(email__iexact=email)
        elif user_type == "homemaker":
            return Homemaker.objects.get(email__iexact=email)
        elif user_type == "admin":
            return Admin.objects.get(email__iexact=email)
    except ObjectDoesNotExist:  # Use Django's ObjectDoesNotExist
        return None



# Customer Views
@api_view(['GET', 'POST'])
def customer_list(request):
    """
    List all customers, or create a new customer.
    """
    if request.method == 'GET':
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PUT', 'DELETE'])
def customer_detail(request, username):
    """
    Retrieve, update or delete a customer instance.
    """
    try:
        customer = Customer.objects.get(username=username)
    except Customer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CustomerSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['DELETE'])
def delete_customer(request, username):
    """
    Delete a customer by username.
    """
    try:
        customer = Customer.objects.get(username=username)
        customer.delete()
        return Response({'message': 'Customer deleted successfully'}, status=200)
    except Customer.DoesNotExist:
        return Response({'message': 'Customer not found'}, status=404)


#address add    
@api_view(['GET', 'PUT'])
def customer_addresses(request, username):
    try:
        customer = Customer.objects.get(username=username)
    except Customer.DoesNotExist:
        return Response({'error': 'Customer not found'}, status=404)

    if request.method == 'GET':
        return Response({'addresses': customer.addresses})

    elif request.method == 'PUT':
        new_address = request.data.get('address')
        if not new_address:
            return Response({'error': 'Address is required'}, status=400)

        customer.addresses.append(new_address)
        customer.save()
        return Response({'message': 'Address added successfully', 'addresses': customer.addresses})
    
@api_view(['DELETE'])
def delete_customer_address(request, username):
    try:
        customer = Customer.objects.get(username=username)
    except Customer.DoesNotExist:
        return Response({'error': 'Customer not found'}, status=404)

    address_to_remove = request.data.get('address')
    if not address_to_remove:
        return Response({'error': 'No address provided'}, status=400)

    # Remove matching address
    updated_addresses = [
        addr for addr in customer.addresses if addr != address_to_remove
    ]

    if len(updated_addresses) == len(customer.addresses):
        return Response({'error': 'Address not found'}, status=404)

    customer.addresses = updated_addresses
    customer.save()

    return Response({'message': 'Address deleted successfully', 'addresses': customer.addresses})

# Deliveryman Views
@api_view(['GET', 'POST'])
def deliveryman_list(request):
    """
    List all deliverymen, or create a new deliveryman.
    """
    if request.method == 'GET':
        deliverymen = Deliveryman.objects.all()
        serializer = DeliverymanSerializer(deliverymen, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = DeliverymanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_deliveryman_by_username(request, username):
    try:
        deliveryman = Deliveryman.objects.get(username=username)
        deliveryman.delete()
        return Response({'message': 'Deliveryman deleted successfully'}, status=200)
    except Deliveryman.DoesNotExist:
        return Response({'message': 'Deliveryman not found'}, status=404)

@api_view(['GET', 'PUT', 'DELETE'])
def deliveryman_detail(request, pk):
    try:
        deliveryman = Deliveryman.objects.get(id=ObjectId(pk))
    except Deliveryman.DoesNotExist:
        return Response({'message': 'Deliveryman not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DeliverymanSerializer(deliveryman)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = DeliverymanSerializer(deliveryman, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        deliveryman.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT'])
def deliveryman_addresses(request, username):
    try:
        deliveryman = Deliveryman.objects.get(username=username)
    except Deliveryman.DoesNotExist:
        return Response({'error': 'Deliveryman not found'}, status=404)

    if request.method == 'GET':
        return Response({'addresses': deliveryman.addresses})

    elif request.method == 'PUT':
        new_address = request.data.get('address')
        if not new_address:
            return Response({'error': 'Address is required'}, status=400)

        deliveryman.addresses.append(new_address)
        deliveryman.save()
        return Response({'message': 'Address added successfully', 'addresses': deliveryman.addresses})

@api_view(['DELETE'])
def delete_deliveryman_address(request, username):
    try:
        deliveryman = Deliveryman.objects.get(username=username)
    except Deliveryman.DoesNotExist:
        return Response({'error': 'Deliveryman not found'}, status=404)

    address_to_remove = request.data.get('address')
    if not address_to_remove:
        return Response({'error': 'No address provided'}, status=400)

    updated_addresses = [addr for addr in deliveryman.addresses if addr != address_to_remove]

    if len(updated_addresses) == len(deliveryman.addresses):
        return Response({'error': 'Address not found'}, status=404)

    deliveryman.addresses = updated_addresses
    deliveryman.save()

    return Response({'message': 'Address deleted successfully', 'addresses': deliveryman.addresses})

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_deliveryman_document(request):
    username = request.data.get('username')
    field_name = request.data.get('fieldName')
    number = request.data.get('number')
    front_image = request.FILES.get('frontImage')
    back_image = request.FILES.get('backImage')

    if not (username and field_name and number and front_image and back_image):
        return Response({'error': 'Missing required fields.'}, status=400)

    try:
        deliveryman = Deliveryman.objects.get(username=username)
    except Deliveryman.DoesNotExist:
        return Response({'error': 'Deliveryman not found.'}, status=404)

    # Create document directory path
    doc_folder = f"documents/{username}/{field_name}"
    doc_dir = os.path.join(settings.MEDIA_ROOT, doc_folder)
    os.makedirs(doc_dir, exist_ok=True)

    # Save image files to disk
    def save_uploaded_file(file_obj, suffix):
        filename = f"{field_name}_{suffix}_{file_obj.name}"
        full_path = os.path.join(doc_dir, filename)
        with open(full_path, 'wb+') as dest:
            for chunk in file_obj.chunks():
                dest.write(chunk)
        return os.path.join(doc_folder, filename)  # relative path to MEDIA_ROOT

    front_image_path = save_uploaded_file(front_image, "front")
    back_image_path = save_uploaded_file(back_image, "back")

    # Update MongoDB deliveryman document
    if not hasattr(deliveryman, 'documents') or deliveryman.documents is None:
        deliveryman.documents = {}

    deliveryman.documents[field_name] = {
        "number": number,
        "images": {
            "front": front_image_path,
            "back": back_image_path
        }
    }
    deliveryman.save()

    return Response({'message': 'Document uploaded successfully.'}, status=200)

# Homemaker Views
@api_view(['GET', 'POST'])
def homemaker_list(request):
    if request.method == 'GET':
        homemakers = Homemaker.objects()
        serializer = HomemakerSerializer(homemakers, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data = request.data

        raw_password = data.get('password', '')
        if not raw_password:
            return Response({'error': 'Password is required'}, status=400)

        hashed_password = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        homemaker = Homemaker(
            home_maker_name=data.get('home_maker_name', ''),
            gender=data.get('gender', ''),
            contact_no=data.get('contact_no', ''),
            email=data.get('email', ''),
            address=data.get('address', ''),
            landmark_city_state=data.get('landmark_city_state', ''),
            pincode=data.get('pincode', ''),
            no_of_meals_per_day=int(data.get('no_of_meals_per_day', 0)),
            survey_status=data.get('survey_status', 'Approved'),
            password=hashed_password
        )
        homemaker.save()
        return Response({'message': 'Homemaker created successfully'}, status=201)


@api_view(['GET', 'PUT', 'DELETE'])
def homemaker_detail(request, homemaker_id):
    try:
        homemaker = Homemaker.objects.get(id=ObjectId(homemaker_id))
    except:
        return Response({'error': 'Invalid or missing homemaker ID'}, status=400)
    
    if request.method == 'DELETE':
        homemaker.delete()
        return Response({'message': 'Deleted'}, status=204)

    if request.method == 'PUT':
        data = request.data
        homemaker.home_maker_name = data.get('home_maker_name', homemaker.home_maker_name)
        homemaker.gender = data.get('gender', homemaker.gender)
        homemaker.contact_no = data.get('contact_no', homemaker.contact_no)
        homemaker.email = data.get('email', homemaker.email)
        homemaker.address = data.get('address', homemaker.address)
        homemaker.landmark_city_state = data.get('landmark_city_state', homemaker.landmark_city_state)
        homemaker.pincode = data.get('pincode', homemaker.pincode)
        homemaker.no_of_meals_per_day = int(data.get('no_of_meals_per_day', homemaker.no_of_meals_per_day))
        homemaker.save()
        return Response(homemaker.to_mongo().to_dict(), status=200)
    
    return Response(homemaker.to_mongo().to_dict())

@api_view(['DELETE'])
def delete_homemaker(request, homemaker_id):
    try:
        homemaker = Homemaker.objects.get(id=homemaker_id)
        homemaker.delete()
        return Response({'message': 'Homemaker deleted successfully'}, status=200)
    except Homemaker.DoesNotExist:
        return Response({'error': 'Homemaker not found'}, status=404)

@api_view(['PUT'])
def update_homemaker(request, homemaker_id):
    try:
        homemaker = Homemaker.objects.get(id=homemaker_id)
        data = request.data

        homemaker.home_maker_name = data.get('home_maker_name', homemaker.home_maker_name)
        homemaker.gender = data.get('gender', homemaker.gender)
        homemaker.contact_no = data.get('contact_no', homemaker.contact_no)
        homemaker.email = data.get('email', homemaker.email)
        homemaker.address = data.get('address', homemaker.address)
        homemaker.landmark_city_state = data.get('landmark_city_state', homemaker.landmark_city_state)
        homemaker.pincode = data.get('pincode', homemaker.pincode)
        homemaker.no_of_meals_per_day = int(data.get('no_of_meals_per_day', homemaker.no_of_meals_per_day))

        homemaker.save()
        return Response({'message': 'Homemaker updated successfully'}, status=200)
    except Homemaker.DoesNotExist:
        return Response({'error': 'Homemaker not found'}, status=404)



# Admin Views
@api_view(['GET', 'POST'])
def admin_list(request):
   data=request.data
   raw_password=data.get('password','')
   if not raw_password:
       return Response({'error': 'Password is required'}, status=400)
   hashed_password = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

   if Admin.objects(email=data.get('email')).first() or Admin.objects(userId=data.get('userId')).first():
        return Response({'message': 'Admin with this email or userId already exists'}, status=409)


   admin=Admin(
       name=data.get('name'),
       userId=data.get('userId'),
       email=data.get('email'),
       contact=data.get('contact'),
       location=data.get('location'),
       password=hashed_password
   )

   try:
       admin.save()
       return Response({'message': 'Admin created successfully'}, status=201)
   except Exception as e:
       return Response({'error': str(e)}, status=400)



@api_view(['GET', 'PUT', 'DELETE'])
def admin_detail(request, username):
    """
    Retrieve, update or delete an admin instance.
    """
    try:
        admin = Admin.objects.get(username=username)
    except Admin.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AdminSerializer(admin)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = AdminSerializer(admin, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        admin.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



# Order Views
@api_view(['GET', 'POST'])
def order_list(request):
    """
    List all orders, or create a new order.
    """
    if request.method == 'GET':
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PUT', 'DELETE'])
def order_detail(request, pk):
    """
    Retrieve, update or delete an order instance.
    """
    try:
        order = Order.objects.get(id=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



# Payment Views
@api_view(['GET', 'POST'])
def payment_list(request):
    """
    List all payments, or create a new payment.
    """
    if request.method == 'GET':
        payments = Payment.objects.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PUT', 'DELETE'])
def payment_detail(request, pk):
    """
    Retrieve, update or delete a payment instance.
    """
    try:
        payment = Payment.objects.get(transaction_id=pk)
    except Payment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PaymentSerializer(payment)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = PaymentSerializer(payment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        payment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



# Login View
@api_view(['POST'])
def login(request, user_type):
    """
    Authenticate a user and return a JWT token.
    """
    email = request.data.get('email').lower().strip()  # Normalize email
    password = request.data.get('password')

    if not email or not password:
        return Response({'message': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = get_user_object(user_type, email)  # Use email to get user

    if not user:
        return Response({'message': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

    if user_type == 'admin':
        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return Response({'message': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        user_identifier = user.userId
        user_name = user.name
    else:  # for customer, deliveryman, homemaker
        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            return Response({'message': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
        user_identifier = getattr(user, 'username', user.email)  # Fallback to email if username is not present
        user_name = user.first_name if hasattr(user, 'first_name') else user_identifier

    payload = {
        'user_id': str(user.id),
        'email': user.email,
        'user_type': user_type,
        'exp': datetime.utcnow() + timedelta(hours=1),
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return Response(
        {
            'token': token,
            'name': user_name,
            'identifier': user_identifier,
        },
        status=status.HTTP_200_OK,
    )



# Forgot Password View
@api_view(['POST'])
def forgot_password(request, user_type):
    """
    Generate and send an OTP for password reset.
    """
    email = request.data.get('email').lower().strip()  # Normalize email

    if not email:
        return Response({'message': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = get_user_object(user_type, email)

    if not user:
        return Response({'message': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    otp_value = generate_otp()
    expiry_time = timezone.now() + timedelta(seconds=OTP_EXPIRATION_SECONDS)

    # Store OTP in the database
    OTP.objects(user_id=str(user.id), user_type=user_type).update_one(
        upsert=True,
        set__otp=otp_value,
        set__expiry_time=expiry_time,
    )

    # In a real application, you would send this OTP via SMS or email.  For this example, we'll just log it.
    print(f"OTP for {email} ({user_type}): {otp_value}")

    return Response({'message': 'OTP sent successfully.'}, status=status.HTTP_200_OK)



# Verify OTP View
@api_view(['POST'])
def verify_otp(request, user_type):
    """
    Verify the OTP entered by the user.
    """
    email = request.data.get('email')
    otp = request.data.get('otp')

    if not email or not otp:
        return Response({'message': 'Email and OTP are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = get_user_object(user_type, email)

    if not user:
        return Response({'message': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

    otp_record = OTP.objects.filter(
        user_id=str(user.id),
        user_type=user_type,
        otp=otp,
        expiry_time__gt=timezone.now(),
    ).first()

    if not otp_record:
        return Response({'message': 'Invalid or expired OTP.'}, status=status.HTTP_401_UNAUTHORIZED)

    # Generate JWT for successful OTP verification
    payload = {
        'user_id': str(user.id),
        'email': user.email,
        'user_type': user_type,
        'exp': datetime.utcnow() + timedelta(hours=1),
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

    # Optionally delete the OTP record after successful verification
    otp_record.delete()

    return Response({
    'token': token,
    'name': getattr(user, 'first_name', '') or getattr(user, 'name', '') or user.email
})




@api_view(['POST'])
def submit_kitchen_details(request):
    """
    Endpoint to submit kitchen details (survey).
    """

    if request.method == 'POST':
        try:
            # changed to .get
            home_maker_name = request.data.get('home_maker_name')
            gender = request.data.get('gender')
            address = request.data.get('address')
            landmark_city_state = request.data.get('landmark_city_state')
            pincode = request.data.get('pincode')
            contact_no = request.data.get('contact_no')
            email = request.data.get('email')
            no_of_meals_per_day = request.data.get('no_of_meals_per_day')
            survey_date_str = request.data.get('survey_date')
            # moved the date conversion
            survey_date = (
                timezone.datetime.strptime(survey_date_str, "%Y-%m-%d").date()
                if survey_date_str
                else None
            )

            survey = Survey(
                home_maker_name=home_maker_name,
                gender=gender,
                address=address,
                landmark_city_state=landmark_city_state,
                pincode=pincode,
                contact_no=contact_no,
                email=email,
                no_of_meals_per_day=no_of_meals_per_day,
                survey_date=survey_date,
                submitted_at=timezone.now(),
            )
            survey.save()

            return Response(
                {'message': 'Kitchen details submitted successfully!', 'survey_status': survey.survey_status},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {'error': str(e), 'message': 'Failed to submit kitchen details.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
    else:

        return Response(
            {'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED
        )



@api_view(['GET'])
def get_admin_user_counts(request):
    """
    Get counts of customers, homemakers, and deliverymen.
    """
    customer_count = Customer.objects.count()
    homemaker_count = Homemaker.objects.count()
    deliveryman_count = Deliveryman.objects.count()
    user_counts = {
        'customers': customer_count,
        'homeMakers': homemaker_count,
        'deliveryMen': deliveryman_count,
    }
    return Response(user_counts)



@api_view(['GET'])
def get_admin_revenue_orders(request):
    """
    Get total revenue and order counts.
    """
    # Replace this with your actual logic to calculate total revenue and order count
    total_revenue = 0  # Example: You might sum up the 'amount' from successful payments
    total_orders = Order.objects.count()
    revenue_orders_data = {
        'revenue': total_revenue,
        'orders': total_orders,
    }
    return Response(revenue_orders_data)


@api_view(['GET'])
def get_admin_survey_counts(request):
    """
    Get counts of total, pending, and approved surveys.
    """
    total_surveys = Survey.objects.count()
    pending_surveys = Survey.objects.filter(survey_status='Pending').count()
    approved_surveys = Survey.objects.filter(survey_status='Approved').count()
    survey_counts = {
        'total': total_surveys,
        'pending': pending_surveys,
        'approved': approved_surveys,
    }
    return Response(survey_counts)


@api_view(['POST'])
def change_admin_password(request):
    """
    Change password for admin.
    - If old_password is provided, it must match.
    - If not provided (after OTP verification), allow update.
    """
    email = request.data.get('email')
    new_password = request.data.get('new_password')
    old_password = request.data.get('old_password')  # Optional for OTP flow

    if not email or not new_password:
        return Response({'message': 'Email and new password are required.'}, status=400)

    try:
        admin = Admin.objects.get(email=email)
    except Admin.DoesNotExist:
        return Response({'message': 'Admin not found.'}, status=404)

    if old_password:
        if not bcrypt.checkpw(old_password.encode(), admin.password.encode()):
            return Response({'message': 'Old password is incorrect.'}, status=401)
    else:
        # Confirming this path is used
        print("🔓 OTP flow - skipping old password validation")

    # Update the password
    hashed_password = bcrypt.hashpw(new_password.encode(), bcrypt.gensalt()).decode()
    admin.update(password=hashed_password)

    return Response({'message': 'Password updated successfully.'}, status=200)



@api_view(['GET'])
def get_surveys(request):
    """
    Retrieve all surveys with _id as string for frontend compatibility.
    """
    surveys = Survey.objects()
    survey_list = []

    for survey in surveys:
        doc = survey.to_mongo().to_dict()
        doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
        survey_list.append(doc)

    return Response(survey_list, status=status.HTTP_200_OK)




@api_view(['GET'])
def get_survey_detail(request, survey_id):
    """
    Retrieve a single survey by its ID.
    """
    try:
        survey = Survey.objects.get(id=survey_id)
        serializer = SurveySerializer(survey)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Survey.DoesNotExist:
        return Response({'message': 'Survey not found'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['PUT'])
def update_survey(request, survey_id):
    try:
        survey = Survey.objects.get(id=survey_id)
    except Survey.DoesNotExist:
        return Response({'error': 'Survey not found'}, status=404)

    data = request.data

    # Update base fields
    survey.survey_status = data.get('survey_status', survey.survey_status)
    survey.landmark_city_state = data.get('landmark_city_state', survey.landmark_city_state)
    survey.pincode = data.get('pincode', survey.pincode)
    survey.no_of_meals_per_day = int(data.get('no_of_meals_per_day', survey.no_of_meals_per_day))

    # ✅ Properly create the EmbeddedDocument instance
    survey_details = SurveyDetails(
        doneBy=data.get("doneBy", ""),
        hygiene=int(data.get("hygiene", 0)),
        kitchenImages=data.get("kitchenImages", []),
        foodTaste=int(data.get("foodTaste", 0)),
        foodImages=data.get("foodImages", []),
        maxMeals=int(data.get("maxMeals", 0)),
        mealType=data.get("mealType", ""),
        approvedDate=datetime.now().isoformat()
    )

    survey.surveyDetails = survey_details
    survey.save()

    serializer = SurveySerializer(survey)
    return Response(serializer.data, status=200)



@api_view(['DELETE'])
def delete_survey(request, survey_id):
    """
    Delete a survey.
    """
    try:
        survey = Survey.objects.get(id=survey_id)
        survey.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Survey.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
def admin_profile(request):
    """
    Retrieve the admin user's profile data.
    """
    # Assuming you have a way to identify the current admin user (e.g., from the request)
    #  Replace this with your actual logic to get the logged-in admin
    admin_user = Admin.objects.first()  #  simplification: gets the first admin
    if admin_user:
        serializer = AdminSerializer(admin_user)
        return Response(serializer.data)
    else:
        return Response({'error': 'Admin user not found.'}, status=404)



@api_view(['GET'])
def home(request):
    """just for test"""
    return HttpResponse("Backend running")