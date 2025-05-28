from mongoengine import Document, StringField, EmailField, DateTimeField, BooleanField, ListField, IntField, CASCADE, ReferenceField, EmbeddedDocument, EmbeddedDocumentField , DictField
from mongoengine.fields import URLField, FloatField


class Customer(Document):
    username = StringField(required=True, unique=True, max_length=100)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True, max_length=255)
    first_name = StringField(max_length=100)
    contact = StringField(max_length=20)
    addresses = ListField(DictField(), default=[])
    date_joined = DateTimeField()
    is_active = BooleanField(default=True)
    customer_type = StringField(
        max_length=50,
        choices=[('Regular', 'Regular'), ('Subscriber', 'Subscriber')],
        default='Regular' # This sets the default value
    )
    
    def __str__(self):
        return self.username


class Deliveryman(Document):
    username = StringField(required=True, unique=True, max_length=100)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True, max_length=255)
    first_name = StringField(max_length=100)
    contact = StringField(max_length=20)
    addresses = ListField(DictField(), default=[])
    date_joined = DateTimeField()
    is_active = BooleanField(default=True)

    aadhar = DictField()
    pan = DictField()
    driving_license = DictField()
    bank_account = DictField()
    vehicle_details = DictField()
    emergency_details = DictField()
    # Add deliveryman-specific fields (e.g., delivery_area, vehicle_details)
    delivery_area = StringField(max_length=200)  # Example field
    vehicle_details = StringField(max_length=100)  # Example

    documents = DictField(default=dict)

    def __str__(self):
        return self.username


class Homemaker(Document):
    home_maker_name = StringField(required=True)
    gender = StringField(required=True)
    contact_no = StringField(required=True)
    email = EmailField(required=True)
    address = StringField(required=True)
    landmark_city_state = StringField(required=True)
    pincode = StringField(required=True)
    no_of_meals_per_day = IntField(required=True)
    survey_status = StringField(default='Approved')
    password = StringField(required=True)

    meta = {'collection': 'homemaker'}  # ✅ This ensures correct collection

    def __str__(self):
        return self.home_maker_name



class Admin(Document):
    name = StringField(required=True,max_length=100)
    userId = StringField(required=True,unique=True, max_length=100)  # Changed from username to userId
    email = EmailField(required=True,unique=True)
    contact = IntField(required=True)
    location = StringField(max_length=200)
    password = StringField(required=True, max_length=255)
    date_joined = DateTimeField()
    is_superuser = BooleanField(default=True)
    is_staff = BooleanField(default=True)
    is_active = BooleanField(default=True)

    def __str__(self):
        return self.userId  # Changed to userId


class Order(Document):
    customer = ReferenceField(Customer, required=True, reverse_delete_rule=CASCADE)  # Changed to ReferenceField
    home_maker = ReferenceField(Homemaker, required=True, reverse_delete_rule=CASCADE)  # Changed to ReferenceField
    deliveryman = ReferenceField(Deliveryman, required=False,
                                 reverse_delete_rule=CASCADE)  # Changed to ReferenceField
    items = ListField(StringField())  # List of item IDs or names
    total_amount = IntField(required=True)
    order_date = DateTimeField()
    delivery_date = DateTimeField()
    status = StringField(choices=[
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ], default='pending')

    def __str__(self):
        return f"Order {self.id} - Customer: {self.customer.username}, Homemaker: {self.home_maker.username}"


class Payment(Document):
    order = ReferenceField(Order, required=True, unique=True,
                           reverse_delete_rule=CASCADE)  # Changed to ReferenceField and added unique
    amount = IntField(required=True)
    payment_date = DateTimeField()
    payment_method = StringField(choices=[
        ('credit_card', 'Credit Card'),
        ('debit_card', 'Debit Card'),
        ('paypal', 'PayPal'),
        ('cash', 'Cash'),
    ], default='cash')
    transaction_id = StringField(required=True, unique=True)  # Added unique constraint

    def __str__(self):
        return f"Payment {self.transaction_id} - Order: {self.order.id}, Amount: {self.amount}"


class OTP(Document):
    user_id = StringField(required=True)
    user_type = StringField(required=True)
    otp = StringField(required=True)
    expiry_time = DateTimeField(required=True)

    meta = {
        'indexes': [
            {'fields': ['user_id', 'user_type', 'otp', 'expiry_time'], 'unique': True},
            {'fields': ['expiry_time'], 'expireAfterSeconds': 0}  # Auto-delete expired OTPs
        ]
    }

    def __str__(self):
        return f"OTP for user_id: {self.id}, OTP: {self.otp}, Type: {self.user_type}"


class SurveyDetails(EmbeddedDocument):
    doneBy = StringField()
    hygiene = IntField()
    kitchenImages = ListField(StringField())
    foodTaste = IntField()
    foodImages = ListField(StringField())
    maxMeals = IntField()
    mealType = StringField(choices=['Veg Only', 'Non-Veg Only', 'Both'])
    approvedDate = StringField()




class Survey(Document):
    home_maker_name = StringField(required=True)
    gender = StringField(required=True, choices=('Male', 'Female', 'Other'))
    address = StringField(required=True)
    landmark_city_state = StringField(required=True)
    pincode = StringField(required=True, max_length=10)
    contact_no = StringField(required=True, max_length=15)
    email = EmailField(required=True)
    no_of_meals_per_day = IntField(required=True)
    survey_date = DateTimeField()
    survey_status = StringField(required=True, default="Pending",
                                 choices=('Pending', 'Approved', 'Rejected'))  # Added Rejected
    submitted_at = DateTimeField()
    surveyDetails = EmbeddedDocumentField(SurveyDetails) # Added surveyDetails

    meta = {'collection': 'survey'}

    def __str__(self):
        return f"Survey for {self.home_maker_name} - Status: {self.survey_status}"
