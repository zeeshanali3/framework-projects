import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme, helpers, ToastService } from '@utils/index';
import { uploadFileToS3, updateUserDetails } from '@actions/index';
import {
  CustomHeader,
  ImageWithSkeleton,
  CustomInput,
  CustomButton,
} from '@components/index';
import { icons } from '@assets';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

const EditProfile = ({ navigation, route }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { currentUser, user_biometrics } = useSelector(state => state.main);

  // Calculate age from birth year
  const calculateAge = birthYear => {
    if (!birthYear) return '';
    const currentYear = new Date().getFullYear();
    return (currentYear - birthYear).toString();
  };
  // Initial profile data from currentUser
  const initialProfileData = {
    name: currentUser?.first_name || '',
    lastName: currentUser?.last_name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone_no || '',
    gender: currentUser?.gender || '',
    units: user_biometrics?.units || 'Metric', // Default since not in currentUser
    age: calculateAge(currentUser?.birth_year) || '',
    height: user_biometrics?.height_cm + ' cm' || '175 cm', // Default since not in currentUser
    weight: user_biometrics?.current_weight_kg + ' kg' || '85.4 kg', // Default since not in currentUser
    weightGoal: user_biometrics?.target_weight_kg + ' kg' || '75 kg', // Default since not in currentUser
    profileImage: currentUser?.user_image || null,
    imageAttachmentId: currentUser?.image_attachment_id || null, // Current attachment ID
  };

  // Profile data state
  const [profileData, setProfileData] = useState(initialProfileData);

  // Store the image data for server upload
  const [selectedImageData, setSelectedImageData] = useState(null);

  // Loading states
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Dropdown options
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const unitsOptions = [
    { label: 'Metric', value: 'metric' },
    { label: 'Imperial', value: 'imperial' },
  ];

  const heightOptions = [
    // Metric heights
    { label: '150 cm', value: '150 cm' },
    { label: '155 cm', value: '155 cm' },
    { label: '160 cm', value: '160 cm' },
    { label: '165 cm', value: '165 cm' },
    { label: '170 cm', value: '170 cm' },
    { label: '175 cm', value: '175 cm' },
    { label: '180 cm', value: '180 cm' },
    { label: '185 cm', value: '185 cm' },
    { label: '190 cm', value: '190 cm' },
    { label: '195 cm', value: '195 cm' },
  ];

  const weightOptions = [
    // Sample weight options
    { label: '50 kg', value: '50 kg' },
    { label: '55 kg', value: '55 kg' },
    { label: '60 kg', value: '60 kg' },
    { label: '65 kg', value: '65 kg' },
    { label: '70 kg', value: '70 kg' },
    { label: '75 kg', value: '75 kg' },
    { label: '80 kg', value: '80 kg' },
    { label: '85 kg', value: '85 kg' },
    { label: '90 kg', value: '90 kg' },
    { label: '95 kg', value: '95 kg' },
    { label: '100 kg', value: '100 kg' },
  ];

  const weightGoalOptions = [
    // Sample weight goal options
    { label: '50 kg', value: '50 kg' },
    { label: '55 kg', value: '55 kg' },
    { label: '60 kg', value: '60 kg' },
    { label: '65 kg', value: '65 kg' },
    { label: '70 kg', value: '70 kg' },
    { label: '75 kg', value: '75 kg' },
    { label: '80 kg', value: '80 kg' },
    { label: '85 kg', value: '85 kg' },
    { label: '90 kg', value: '90 kg' },
    { label: '95 kg', value: '95 kg' },
  ];

  // Memoized image source to prevent unnecessary re-renders
  const imageSource = useMemo(() => {
    if (selectedImageData?.uri) {
      return { uri: selectedImageData.uri };
    }
    if (profileData.profileImage) {
      return { uri: profileData.profileImage };
    }
    return null;
  }, [selectedImageData?.uri, profileData.profileImage]);

  // Check if profile data has changed
  const hasChanges = () => {
    // Check if image has been selected (new image)
    if (selectedImageData) return true;

    // Compare current profile data with initial data
    const fieldsToCompare = [
      'name',
      'lastName',
      'email',
      'phone',
      'gender',
      'units',
      'age',
      'height',
      'weight',
      'weightGoal',
    ];

    return fieldsToCompare.some(field => {
      return profileData[field] !== initialProfileData[field];
    });
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImagePress = () => {
    Alert.alert('Change Profile Picture', 'Select an option', [
      { text: 'Camera', onPress: () => openCamera() },
      { text: 'Gallery', onPress: () => openGallery() },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      cropperToolbarTitle: 'Edit Profile Picture',
      includeBase64: true,
      compressImageQuality: 0.8,
      mediaType: 'photo',
    })
      .then(image => {
        handleImageSelected(image);
      })
      .catch(error => {
       
        if (error.code !== 'E_PICKER_CANCELLED') {
          Alert.alert('Error', 'Failed to open camera');
        }
      });
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      cropperToolbarTitle: 'Edit Profile Picture',
      includeBase64: true,
      compressImageQuality: 0.8,
      mediaType: 'photo',
    })
      .then(image => {
        handleImageSelected(image);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          Alert.alert('Error', 'Failed to open gallery');
        }
      });
  };

  const handleImageSelected = image => {
   

    // Store image data for future server upload
    setSelectedImageData({
      uri: image.path,
      type: image.mime,
      name: `profile_${Date.now()}.jpg`,
      size: image.size,
      base64: image.data,
    });

    // Update profile image for display - keep the new image path
    setProfileData(prev => ({
      ...prev,
      profileImage: image.path,
    }));
  };

  const handleSave = () => {
   
    if (selectedImageData) {
      // Upload image first, then save profile
      uploadImageToServer();
    } else {
      // No image to upload, just save profile data
      saveProfileData();
    }
  };

  const uploadImageToServer = () => {

    setIsUploadingImage(true);

    // STEP 1: First get the upload URL from your server
    getUploadUrl();
  };

  const getUploadUrl = () => {
  
    
    // You need to replace this with your actual API endpoint
    const uploadUrlEndpoint = 'YOUR_API_ENDPOINT/get-upload-url'; // Replace with your endpoint
    
    const requestBody = {
      fileName: selectedImageData.name,
      fileType: selectedImageData.type,
      fileSize: selectedImageData.size,
      // Add any other metadata your server needs
    };

   

    fetch(uploadUrlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add your auth headers here
        // 'Authorization': `Bearer ${userToken}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        
        if (data.uploadUrl) {
          // STEP 2: Now upload to S3 with the received URL
          uploadToS3WithUrl(data.uploadUrl, data);
        } else {
          throw new Error('No upload URL received');
        }
      })
      .catch(error => {
        console.error('Failed to get upload URL:', error);
        setIsUploadingImage(false);
        ToastService.error('Error', 'Failed to get upload URL');
      });
  };

  const uploadToS3WithUrl = (uploadUrl, uploadData) => {
   

    // Prepare file object for upload
    const fileToUpload = {
      uri: selectedImageData.uri,
      type: selectedImageData.type,
      name: selectedImageData.name,
      size: selectedImageData.size,
    };

  

    dispatch(
      uploadFileToS3(
        fileToUpload,
        uploadUrl, // Pass the upload URL
        response => {
          setIsUploadingImage(false);

          // Extract attachment ID and token from response
          const attachmentId = response?.file?.attachmentId;
          const token = response?.file?.token;

          if (attachmentId) {
            // Update profile data with attachment ID
            const updatedProfileData = {
              ...profileData,
              imageAttachmentId: attachmentId,
              profileImageToken: token, // Store token if needed
            };


            // Now save the complete profile data
            saveProfileData(updatedProfileData);

            ToastService.success(
              'Success',
              'Profile image uploaded successfully!',
            );
          } else {
            console.error('No attachment ID received from upload response');
            ToastService.error(
              'Error',
              'Image uploaded but no attachment ID received',
            );
            // Still save profile without image update
            saveProfileData();
          }
        },
        error => {
          console.error('Image upload failed:', error);
          setIsUploadingImage(false);

          ToastService.error(
            'Error',
            'Failed to upload profile image. Please try again.',
          );

          // Still save profile data without image
          saveProfileData();
        },
      ),
    );
  };

  const saveProfileData = (dataToSave = profileData) => {
    setIsSavingProfile(true);

    // Structure data for server update
    const profileUpdateData = {
      user_id: currentUser?.user_id,
      first_name: dataToSave.name,
      last_name: dataToSave.lastName,
      email: dataToSave.email,
      phone_no: dataToSave.phone,
      gender: dataToSave.gender,
      birth_year: dataToSave.age
        ? new Date().getFullYear() - parseInt(dataToSave.age)
        : currentUser?.birth_year,
      units: dataToSave.units,
      height: dataToSave.height,
      weight: dataToSave.weight,
      weight_goal: dataToSave.weightGoal,
      // Add image attachment ID if image was uploaded
      ...(dataToSave.imageAttachmentId && {
        image_attachment_id: dataToSave.imageAttachmentId,
      }),
    };

   

    dispatch(
      updateUserDetails(
        profileUpdateData,
        response => {
          setIsSavingProfile(false);
       

          ToastService.success('Success', 'Profile updated successfully!');

          // Navigate back to profile screen
          navigation.goBack();
        },
        error => {
          setIsSavingProfile(false);
          console.error('Profile update failed:', error);

          ToastService.error(
            'Error',
            'Failed to update profile. Please try again.',
          );
        },
      ),
    );
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles(theme).container}>
      <CustomHeader
        leftIcon="arrow-left"
        title="Edit Profile"
        onLeftPress={navigateBack}
        leftIconBackgroundStyle={[
          styles(theme).iconBackgroundStyle,
          { marginLeft: 0 },
        ]}
      />

      <ScrollView
        style={styles(theme).scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles(theme).scrollContent}
      >
        <View style={styles(theme).profileImageContainer}>
          <TouchableOpacity
            style={styles(theme).imageWrapper}
            onPress={handleImagePress}
            activeOpacity={0.8}
          >
            <View style={styles(theme).profileImage}>
              <ImageWithSkeleton
                source={imageSource}
                placeholderSource={icons.inactiveUser}
                width={helpers.normalize(88)}
                height={helpers.normalize(88)}
                resizeMode="cover"
                style={styles(theme).profileImageStyle}
              />
            </View>

            <View style={styles(theme).cameraIconContainer}>
              <Image source={icons.camera} style={styles(theme).cameraIcon} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles(theme).formContainer}>
          <CustomInput
            label="First Name"
            labelStyle={styles(theme).label}
            noBorder={true}
            value={profileData.name}
            onChangeText={value => handleInputChange('name', value)}
            placeholder="Enter your first name"
            containerStyle={styles(theme).inputContainer}
            inputFieldStyle={{ paddingHorizontal: 0 }}
          />

          <CustomInput
            label="Last Name"
            labelStyle={styles(theme).label}
            noBorder={true}
            value={profileData.lastName}
            onChangeText={value => handleInputChange('lastName', value)}
            placeholder="Enter your last name"
            containerStyle={styles(theme).inputContainer}
            inputFieldStyle={{ paddingHorizontal: 0 }}
          />

          <CustomInput
            label="Email"
            labelStyle={styles(theme).label}
            noBorder={true}
            value={profileData.email}
            onChangeText={value => handleInputChange('email', value)}
            placeholder="Enter your email"
            editable={false}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles(theme).inputContainer}
            inputFieldStyle={{ paddingHorizontal: 0 }}
          />

          <CustomInput
            label="Phone Number"
            labelStyle={styles(theme).label}
            noBorder={true}
            value={profileData.phone}
            onChangeText={value => handleInputChange('phone', value)}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            containerStyle={styles(theme).inputContainer}
            inputFieldStyle={{ paddingHorizontal: 0 }}
          />

          <CustomInput
            label="Gender"
            value={profileData.gender}
            labelStyle={styles(theme).label}
            noBorder={true}
            inputStyle={[
              styles(theme).label,
              { color: theme.colors.content.primary },
            ]}
            type="dropdown"
            dropdownOptions={genderOptions}
            onChangeText={value => handleInputChange('gender', value)}
            placeholder="Select gender"
            dropDownTitle="Select Gender"
            inputFieldStyle={{
              minHeight: helpers.normalize(48),
              marginBottom: theme.spacing.sm,
            }}
          />

          <CustomInput
            label="Units"
            value={profileData.units}
            labelStyle={styles(theme).label}
            inputStyle={[
              styles(theme).label,
              { color: theme.colors.content.primary },
            ]}
            noBorder={true}
            type="dropdown"
            dropdownOptions={unitsOptions}
            onChangeText={value => handleInputChange('units', value)}
            placeholder="Select units"
            dropDownTitle="Select Units"
            inputFieldStyle={{
              minHeight: helpers.normalize(48),
              marginBottom: theme.spacing.sm,
            }}
          />

          <CustomInput
            label="Age"
            value={profileData.age}
            labelStyle={styles(theme).label}
            noBorder={true}
            onChangeText={value => handleInputChange('age', value)}
            placeholder="Enter your age"
            keyboardType="numeric"
            containerStyle={styles(theme).inputContainer}
            inputFieldStyle={{ paddingHorizontal: 0 }}
          />

          <CustomInput
            label="Height"
            value={profileData.height}
            labelStyle={styles(theme).label}
            inputStyle={[
              styles(theme).label,
              { color: theme.colors.content.primary },
            ]}
            noBorder={true}
            type="dropdown"
            dropdownOptions={heightOptions}
            onChangeText={value => handleInputChange('height', value)}
            placeholder="Select height"
            dropDownTitle="Select Height"
            inputFieldStyle={{
              minHeight: helpers.normalize(48),
              marginBottom: theme.spacing.sm,
            }}
          />

          <CustomInput
            label="Weight"
            value={profileData.weight}
            labelStyle={styles(theme).label}
            inputStyle={[
              styles(theme).label,
              { color: theme.colors.content.primary },
            ]}
            noBorder={true}
            type="dropdown"
            dropdownOptions={weightOptions}
            onChangeText={value => handleInputChange('weight', value)}
            placeholder="Select weight"
            dropDownTitle="Select Weight"
            inputFieldStyle={{
              minHeight: helpers.normalize(48),
              marginBottom: theme.spacing.sm,
            }}
          />

          <CustomInput
            label="Weight goal"
            value={profileData.weightGoal}
            inputStyle={[
              styles(theme).label,
              { color: theme.colors.content.primary },
            ]}
            type="dropdown"
            labelStyle={styles(theme).label}
            noBorder={true}
            dropdownOptions={weightGoalOptions}
            onChangeText={value => handleInputChange('weightGoal', value)}
            placeholder="Select weight goal"
            dropDownTitle="Select Weight Goal"
            inputFieldStyle={{
              minHeight: helpers.normalize(48),
              marginBottom: theme.spacing.sm,
            }}
          />
        </View>

        {/* Save Button */}
        <View style={styles(theme).saveButtonContainer}>
          <CustomButton
            title={
              isUploadingImage
                ? 'Uploading Image...'
                : isSavingProfile
                ? 'Saving...'
                : 'Save'
            }
            textStyle={styles(theme).saveButtonTitle}
            onPress={handleSave}
            variant="primary"
            size="large"
            fullWidth
            disabled={!hasChanges() || isUploadingImage || isSavingProfile}
            loading={isUploadingImage || isSavingProfile}
            containerStyle={[
              styles(theme).saveButton,
              (isUploadingImage || isSavingProfile) &&
                styles(theme).saveButtonDisabled,
            ]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.main,
    },
    iconBackgroundStyle: {
      height: helpers.normalize(40),
      width: helpers.normalize(40),
      borderRadius: helpers.normalize(20),
      backgroundColor: theme.colors.background.surface,
    },
    scrollContainer: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: theme.spacing.xl,
    },
    profileImageContainer: {
      alignItems: 'flex-start',
      marginVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    },
    imageWrapper: {
      position: 'relative',
      width: helpers.normalize(100),
      height: helpers.normalize(100),
    },
    profileImage: {
      width: helpers.normalize(88),
      height: helpers.normalize(88),
      borderRadius: helpers.normalize(50),
      overflow: 'hidden',
      backgroundColor: theme.colors.background.surface,
    },
    profileImageStyle: {
      borderRadius: helpers.normalize(44),
    },
    cameraIconContainer: {
      position: 'absolute',
      bottom: 20,
      right: 10,
      backgroundColor: theme.colors.background.surface,
      borderRadius: helpers.normalize(20),
      width: helpers.normalize(40),
      height: helpers.normalize(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.background.main,
      overflow: 'visible',
      ...theme.shadows.sm,
    },
    cameraIcon: {
      width: helpers.normalize(24),
      height: helpers.normalize(24),
      tintColor: theme.colors.content.primary,
    },
    formContainer: {
      paddingHorizontal: theme.spacing.md,
    },
    label: {
      ...theme.typography.body_medium,
      color: theme.colors.content.secondary,
    },
    inputContainer: {
      marginBottom: theme.spacing.md,
    },
    saveButtonContainer: {
      paddingHorizontal: theme.spacing.md,
      marginTop: theme.spacing.xl,
    },
    saveButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.pill,
      height: helpers.normalize(50),
    },
    saveButtonDisabled: {
      backgroundColor: theme.colors.text.muted,
      opacity: 0.7,
    },
    saveButtonTitle: {
      ...theme.typography.label_medium,
      color: theme.colors.universalDark,
    },
    saveButtonTitleDisabled: {
      color: theme.colors.text.muted,
    },
  });

export default EditProfile;
