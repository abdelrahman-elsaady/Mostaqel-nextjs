'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";
// import { useSession } from "next-auth/react"
import { SessionProvider } from "next-auth/react"

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [freelancers, setFreelancers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [singleFreelancer, setSingleFreelancer] = useState({});
  const [singleProject, setSingleProject] = useState({});
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    totalFreelancers: 0,
    freelancersPerPage: 10
  });
  // const { data: session } = useSession()

  // console.log(session);

  const fetchFreelancers = async (page = 1, search = '', category = '') => {
    try {
      const params = new URLSearchParams({
        page: page.toString()
      });
      
      if (search) params.append('search', search);
      if (category) params.append('category', category);

      const response = await axios.get(`${process.env.BASE_URL}/users/freelancers?${params.toString()}`);
      setFreelancers(response.data.users);
      setPaginationInfo(response.data.pagination);
    } catch (err) {
      console.error("Error fetching freelancers:", err);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${process.env.BASE_URL}/projects`);
      setProjects(response.data);

    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const getFreelancerById = async (id) => {
    try {
          const response = await axios.get(`${process.env.BASE_URL}/users/${id}`);
      setSingleFreelancer(response.data.data);
      return response.data.data;
    } catch (err) {
      console.error("Error fetching freelancer:", err);
    }
  };

  const getProjectById = async (id) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/projects/${id}`);
      // setSingleProject(response.data);
      return response.data;   
    } catch (err) {
      console.error("Error fetching project:", err);
    }
  };

  const updateProfile = async (userId, profileData) => {
    try {
      const response = await axios.patch(`${process.env.BASE_URL}/users/${userId}`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsProfileComplete(true);
      return response.data;
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const fetchSkillsAndCategories = async () => {
    try {
      const [skillsResponse, categoriesResponse] = await Promise.all([
        axios.get(`${process.env.BASE_URL}/skills`),
        axios.get(`${process.env.BASE_URL}/categories`),
      ]);
      return {
        skills: skillsResponse.data,
        categories: categoriesResponse.data.categories
      };
    } catch (error) {
      console.error("Error fetching skills and categories:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.BASE_URL}/categories`);
      setCategories(response.data.categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // let cookies = new Cookies();
  // let token = cookies.get('token');

  // if (token) {
  //   setToken(token);
  //   const decoded = jwtDecode(token);
  //   setUserId(decoded.id);
  //   setIsLoggedIn(true);
  // }

  useEffect(() => {
      let cookies = new Cookies();
  let token = cookies.get('token');
    if (token) {
      setToken(token);
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      setIsLoggedIn(true);
      getFreelancerById(decoded.id);
    }
  }, [token]);

  return (
    
    <SessionProvider>
    <AppContext.Provider value={{
      freelancers,
      projects,
      categories,
      isLoggedIn,
      userId,
      token,
      paginationInfo,
      singleFreelancer,
      singleProject,
      setSingleFreelancer,
      fetchFreelancers,
      fetchProjects,
      fetchCategories,
      getFreelancerById,
      getProjectById,
      updateProfile,
      fetchSkillsAndCategories,
      isProfileComplete
    }}>
      {children}
    </AppContext.Provider>
    </SessionProvider>
  );
};

export const useAppContext = () => useContext(AppContext);