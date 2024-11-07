// Modify the handleImageUpload function
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, profilePicture: 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت' });
      return;
    }

    // Just store the file object directly
    setProfilePicture(file);
    setErrors({ ...errors, profilePicture: '' });
    
    // Create a temporary URL for preview
    const previewUrl = URL.createObjectURL(file);
    setProfilePreview(previewUrl); // Add this state for preview
  }
};

// Modify the handleFormSubmission function
const handleFormSubmission = async () => {
  try {
    const formDataToSend = new FormData();
    
    // Append all form fields
    Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
    
    // Append skills as JSON string
    formDataToSend.append('skills', JSON.stringify(selectedSkills.map(skill => skill._id)));
    
    // Append the file object directly (not as base64)
    if (profilePicture instanceof File) {
      formDataToSend.append('profilePicture', profilePicture);
    }

    // Make sure to set the correct headers in your axios request
    const response = await updateProfile(userId, formDataToSend);
    
    if (response.message === 'User was edited successfully') {
      Swal.fire({
        icon: 'success',
        title: 'تم حفظ الملف الشخصي بنجاح',
        showConfirmButton: false,
        text: `شكراً ${formData.firstName}`,
        timer: 1500
      }).then(() => {
        window.location.href = '/';
      });
    }
  } catch (error) {
    console.error("Submission error:", error);
    Swal.fire({
      icon: 'error',
      title: 'خطأ',
      text: 'حدث خطأ أثناء حفظ البيانات'
    });
  }
};