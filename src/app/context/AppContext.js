'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    
  const [freelancers, setFreelancers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState(null);
  const [singleFreelancer, setSingleFreelancer] = useState(null);
  const [singleProject, setSingleProject] = useState(null);
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    if (token) {
      setToken(token);
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      setIsLoggedIn(true);
    }
  }, []);

  const fetchFreelancers = async () => {
    try {
      const response = await axios.get(`${process.env.BASE_URL}/users`);
      const sortedFreelancers = response.data.users.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFreelancers(sortedFreelancers);
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
      // setSingleFreelancer(response.data.data);
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

  return (
    <AppContext.Provider value={{
      freelancers,
      projects,
      isLoggedIn,
      userId,
      token,
      singleFreelancer,
      singleProject,
      fetchFreelancers,
      fetchProjects,
      getFreelancerById,
      getProjectById
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);