from django.db import models
from django.contrib.auth.models import User
import pyotp

class UserProfile(models.Model):
    """Extended user profile model"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    two_fa_enabled = models.BooleanField(default=False)
    two_fa_secret = models.CharField(max_length=32, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.user.username} Profile'
    
    def generate_2fa_secret(self):
        """Generate a new TOTP secret for Google Authenticator"""
        self.two_fa_secret = pyotp.random_base32()
        return self.two_fa_secret
    
    def get_2fa_uri(self):
        """Get the provisioning URI for QR code generation"""
        if not self.two_fa_secret:
            self.generate_2fa_secret()
        totp = pyotp.TOTP(self.two_fa_secret)
        return totp.provisioning_uri(
            name=self.user.email,
            issuer_name='DataStAlgo Shop'
        )
    
    def verify_2fa_token(self, token):
        """Verify a TOTP token from Google Authenticator"""
        if not self.two_fa_enabled or not self.two_fa_secret:
            return False
        totp = pyotp.TOTP(self.two_fa_secret)
        return totp.verify(token)
