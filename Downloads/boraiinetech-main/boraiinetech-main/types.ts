import React from 'react';

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

export interface ServiceItem {
  title: string;
  description: string;
  detailedDescription: string;
  icon: React.ComponentType<any>;
  features: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export enum BookingStatus {
  IDLE = 'IDLE',
  BOOKED = 'BOOKED',
  FAILED = 'FAILED'
}

export interface BookingDetails {
  clientName: string;
  contactInfo: string;
  topic: string;
  date?: string;
}