function validation(values) {
    let errors = {};
  
    // Name validation
    if (!values.fullName) {
      errors.fullName = 'Name is required';
    }
  
    // Email validation
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    // Password validation
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)) {
      errors.password = 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character';
    }
  
    return errors;
  }
  
  export default validation;