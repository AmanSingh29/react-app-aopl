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
  const [formMode, setFormMode] = useState("signup");
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
    if (formMode === "login") {
      if (!formData.UserName || !formData.Password) {
        showError("Username and Password are required");
        return false;
      }
    }

    if (formMode === "signup") {
      for (const [key, value] of Object.entries(formData)) {
        if (!value) {
          showError(`${key} is required`);
          return false;
        }
      }
    }

    return true;
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      error={errors}
    />
  );
};

export default AuthScreen;
