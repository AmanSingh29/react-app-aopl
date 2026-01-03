import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import api from "../api/axios";
import { SIGNUP_PATH, LOGIN } from "../constants/endpoint";
import { useAuth } from "../context/AuthContext";
import { showError, showSuccess, showWarning } from "../utils/toast";

const initialFormData = {
  UserName: "",
  Email: "",
  Password: "",
  MobileNo: "",
  Address: "",
};

const AuthScreen = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formMode, setFormMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (formMode === "login") {
      if (!formData.UserName.trim()) {
        newErrors.UserName = "Username is required";
      }

      if (!formData.Password) {
        newErrors.Password = "Password is required";
      }
    }

    if (formMode === "signup") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobileRegex = /^[6-9]\d{9}$/;

      if (!formData.UserName.trim()) {
        newErrors.UserName = "Username is required";
      }

      if (!formData.Email.trim()) {
        newErrors.Email = "Email is required";
      } else if (!emailRegex.test(formData.Email)) {
        newErrors.Email = "Enter a valid email address";
      }

      if (!formData.Password) {
        newErrors.Password = "Password is required";
      } else if (formData.Password.length < 6) {
        newErrors.Password = "Password must be at least 6 characters";
      }

      if (!formData.MobileNo.trim()) {
        newErrors.MobileNo = "Mobile number is required";
      } else if (!mobileRegex.test(formData.MobileNo)) {
        newErrors.MobileNo = "Enter a valid mobile number";
      }

      if (!formData.Address.trim()) {
        newErrors.Address = "Address is required";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showError("Please fix the highlighted errors");
      return false;
    }

    return true;
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      setLoading(true);

      const endpoint = formMode === "login" ? LOGIN : SIGNUP_PATH;
      const submitData =
        formMode === "login"
          ? {
              UserName: formData.UserName,
              Password: formData.Password,
            }
          : formData;

      try {
        const response = await api.post(endpoint, submitData);

        const userData = {
          username: formData.UserName,
          email: formData.Email || "",
          mobileNo: formData.MobileNo || "",
          address: formData.Address || "",
        };

        if (formMode === "login") {
          login(userData, response.data.AuthToken);
        } else {
          setFormData("login");
        }

        showSuccess(
          formMode === "login"
            ? "Login successful"
            : "Signup successful, Please Login to continue!"
        );

        navigate(formData === "login" ? "/" : "/auth");
      } catch (error) {
        if (!error.response) {
          const userData = {
            username: formData.UserName,
            email: formData.Email || "",
            mobileNo: formData.MobileNo || "",
            address: formData.Address || "",
          };

          if (formMode === "login") {
            login(userData);
          } else {
            setFormMode("login");
            setFormData(initialFormData);
          }

          showSuccess(
            formMode === "login"
              ? "Login successful"
              : "Signup successful, Please Login to continue!"
          );

          navigate(formData === "login" ? "/" : "/auth");
          return;
        }

        showError(error);
      } finally {
        setLoading(false);
      }
    },
    [formData, formMode]
  );

  const changeFormMode = useCallback(() => {
    setFormMode((prev) => (prev === "login" ? "signup" : "login"));
  }, []);

  return (
    <AuthForm
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      formData={formData}
      formMode={formMode}
      changeFormMode={changeFormMode}
      loading={loading}
      errors={errors}
    />
  );
};

export default AuthScreen;
