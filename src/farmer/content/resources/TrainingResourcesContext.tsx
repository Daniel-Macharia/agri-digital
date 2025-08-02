import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Article, Training } from './types';

// Interfaces
interface RegistrationFormData {
  name: string;
  email: string;
}

interface TrainingResourcesContextType {
  // State
  activeTab: string;
  searchValue: string;
  filterOption: string;
  showPayment: boolean;
  selectedItem: Article | Training | null;
  paymentType: 'article' | 'training' | null;
  showRegistrationModal: boolean;
  selectedTraining: Training | null;
  registrationFormData: RegistrationFormData | null;
  showArticleDetail: boolean;
  selectedArticle: Article | null;
  showTrainingDetail: boolean;
  selectedTrainingDetail: Training | null;
  purchasedArticles: Set<string | number>;
  registeredTrainings: Set<string | number>;
  
  // Actions
  setActiveTab: (tab: string) => void;
  setSearchValue: (value: string) => void;
  setFilterOption: (option: string) => void;
  handleArticlePurchase: (article: Article) => void;
  handleArticleImageClick: (article: Article) => void;
  handleTrainingRegister: (training: Training) => void;
  handleTrainingImageClick: (training: Training) => void;
  handleProceedToPayment: (item: Article | Training, formData: RegistrationFormData) => void;
  handlePaymentSuccess: (paymentData: unknown) => void;
  handlePaymentCancel: () => void;
  handleBackFromArticleDetail: () => void;
  handleBackFromTrainingDetail: () => void;
  closeRegistrationModal: () => void;
  
  // Event handlers that can be customized
  onTabChange?: (tabId: string) => void;
  onSearchChange?: (value: string) => void;
  onArticlePurchase?: (article: Article) => void;
  onArticleClick?: (article: Article) => void;
  onTrainingRegister?: (training: Training) => void;
  onTrainingClick?: (training: Training) => void;
}

// Create context
const TrainingResourcesContext = createContext<TrainingResourcesContextType | undefined>(undefined);

// Custom hook
export function useTrainingResources() {
  const context = useContext(TrainingResourcesContext);
  if (context === undefined) {
    throw new Error('useTrainingResources must be used within a TrainingResourcesProvider');
  }
  return context;
}

// Provider props
interface TrainingResourcesProviderProps {
  children: ReactNode;
  initialActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  onSearchChange?: (value: string) => void;
  onArticlePurchase?: (article: Article) => void;
  onArticleClick?: (article: Article) => void;
  onTrainingRegister?: (training: Training) => void;
  onTrainingClick?: (training: Training) => void;
}

// Provider component
export function TrainingResourcesProvider({
  children,
  initialActiveTab = 'all',
  onTabChange,
  onSearchChange,
  onArticlePurchase,
  onArticleClick,
  onTrainingRegister,
  onTrainingClick
}: TrainingResourcesProviderProps) {
  // State management
  const [activeTab, setActiveTabState] = useState<string>(initialActiveTab);
  const [searchValue, setSearchValueState] = useState<string>('');
  const [filterOption, setFilterOptionState] = useState<string>('all');
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Article | Training | null>(null);
  const [paymentType, setPaymentType] = useState<'article' | 'training' | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState<boolean>(false);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [registrationFormData, setRegistrationFormData] = useState<RegistrationFormData | null>(null);
  const [showArticleDetail, setShowArticleDetail] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showTrainingDetail, setShowTrainingDetail] = useState<boolean>(false);
  const [selectedTrainingDetail, setSelectedTrainingDetail] = useState<Training | null>(null);
  const [purchasedArticles, setPurchasedArticles] = useState<Set<string | number>>(new Set());
  const [registeredTrainings, setRegisteredTrainings] = useState<Set<string | number>>(new Set());

  // Action handlers
  const setActiveTab = React.useCallback((tab: string) => {
    setActiveTabState(tab);
    onTabChange?.(tab);
  }, [onTabChange]);

  const setSearchValue = React.useCallback((value: string) => {
    setSearchValueState(value);
    onSearchChange?.(value);
  }, [onSearchChange]);

  const setFilterOption = React.useCallback((option: string) => {
    setFilterOptionState(option);
  }, []);

  const handleArticlePurchase = React.useCallback((article: Article) => {
    console.log('Handling article purchase for ID:', article.id);
    setSelectedItem(article);
    setPaymentType('article');
    setShowPayment(true);
    setShowArticleDetail(false);
    onArticlePurchase?.(article);
  }, [onArticlePurchase]);

  const handleArticleImageClick = React.useCallback((article: Article) => {
    setSelectedArticle(article);
    setShowArticleDetail(true);
    setShowTrainingDetail(false);
    setShowPayment(false);
    onArticleClick?.(article);
  }, [onArticleClick]);

  const handleTrainingRegister = React.useCallback((training: Training) => {
    setSelectedTraining(training);
    setShowRegistrationModal(true);
    setShowPayment(false);
    onTrainingRegister?.(training);
  }, [onTrainingRegister]);

  const handleTrainingImageClick = React.useCallback((training: Training) => {
    setSelectedTrainingDetail(training);
    setShowTrainingDetail(true);
    setShowArticleDetail(false);
    setShowPayment(false);
    onTrainingClick?.(training);
  }, [onTrainingClick]);

  const handleProceedToPayment = React.useCallback((item: Article | Training, formData: RegistrationFormData) => {
    console.log('Proceeding to payment for item ID:', item.id);
    setRegistrationFormData(formData);
    setSelectedItem(item);
    setPaymentType('article' in item ? 'article' : 'training');
    setShowRegistrationModal(false);
    setShowArticleDetail(false);
    setShowTrainingDetail(false);
    setShowPayment(true);
  }, []);

  const handlePaymentSuccess = React.useCallback((paymentData: unknown) => {
    console.log('Payment successful:', paymentData);
    console.log('Item purchased/registered:', selectedItem);
    console.log('Registration form data:', registrationFormData);
    
    if (paymentType === 'article' && selectedItem) {
      console.log('Adding article ID to purchasedArticles:', selectedItem.id);
      setPurchasedArticles(prev => {
        const newSet = new Set(prev);
        newSet.add(selectedItem.id);
        console.log('Updated purchasedArticles:', Array.from(newSet));
        return newSet;
      });
      // Navigate back to article detail page
      setShowArticleDetail(true);
      setSelectedArticle(selectedItem as Article);
    } else if (paymentType === 'training' && selectedItem) {
      console.log('Adding training ID to registeredTrainings:', selectedItem.id);
      setRegisteredTrainings(prev => {
        const newSet = new Set(prev);
        newSet.add(selectedItem.id);
        console.log('Updated registeredTrainings:', Array.from(newSet));
        return newSet;
      });
      // Navigate back to training detail page
      setShowTrainingDetail(true);
      setSelectedTrainingDetail(selectedItem as Training);
    }
    
    // Reset payment state
    setShowPayment(false);
    setSelectedItem(null);
    setPaymentType(null);
    setRegistrationFormData(null);
    
    // Show success message
    const message = paymentType === 'article' 
      ? `Payment successful! You have successfully purchased "${selectedItem?.title}"`
      : `Registration successful! You have successfully registered for "${selectedItem?.title}". A confirmation email will be sent to ${registrationFormData?.email}`;
    
    alert(message);
  }, [paymentType, selectedItem, registrationFormData]);

  const handlePaymentCancel = React.useCallback(() => {
    console.log('Payment cancelled, navigating back to item ID:', selectedItem?.id);
    // Navigate back to appropriate detail page
    if (paymentType === 'article' && selectedItem) {
      setShowArticleDetail(true);
      setSelectedArticle(selectedItem as Article);
    } else if (paymentType === 'training' && selectedItem) {
      setShowTrainingDetail(true);
      setSelectedTrainingDetail(selectedItem as Training);
    }
    setShowPayment(false);
    setSelectedItem(null);
    setPaymentType(null);
    setRegistrationFormData(null);
  }, [paymentType, selectedItem]);

  const handleBackFromArticleDetail = React.useCallback(() => {
    console.log('Navigating back from article detail');
    setShowArticleDetail(false);
    setSelectedArticle(null);
    setShowPayment(false);
    setSelectedItem(null);
    setPaymentType(null);
  }, []);

  const handleBackFromTrainingDetail = React.useCallback(() => {
    console.log('Navigating back from training detail');
    setShowTrainingDetail(false);
    setSelectedTrainingDetail(null);
    setShowPayment(false);
    setSelectedItem(null);
    setPaymentType(null);
  }, []);

  const closeRegistrationModal = React.useCallback(() => {
    setShowRegistrationModal(false);
    setSelectedTraining(null);
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = React.useMemo<TrainingResourcesContextType>(() => ({
    // State
    activeTab,
    searchValue,
    filterOption,
    showPayment,
    selectedItem,
    paymentType,
    showRegistrationModal,
    selectedTraining,
    registrationFormData,
    showArticleDetail,
    selectedArticle,
    showTrainingDetail,
    selectedTrainingDetail,
    purchasedArticles,
    registeredTrainings,
    
    // Actions
    setActiveTab,
    setSearchValue,
    setFilterOption,
    handleArticlePurchase,
    handleArticleImageClick,
    handleTrainingRegister,
    handleTrainingImageClick,
    handleProceedToPayment,
    handlePaymentSuccess,
    handlePaymentCancel,
    handleBackFromArticleDetail,
    handleBackFromTrainingDetail,
    closeRegistrationModal,
    
    // Event handlers
    onTabChange,
    onSearchChange,
    onArticlePurchase,
    onArticleClick,
    onTrainingRegister,
    onTrainingClick
  }), [
    activeTab,
    searchValue,
    filterOption,
    showPayment,
    selectedItem,
    paymentType,
    showRegistrationModal,
    selectedTraining,
    registrationFormData,
    showArticleDetail,
    selectedArticle,
    showTrainingDetail,
    selectedTrainingDetail,
    purchasedArticles,
    registeredTrainings,
    setActiveTab,
    setSearchValue,
    setFilterOption,
    handleArticlePurchase,
    handleArticleImageClick,
    handleTrainingRegister,
    handleTrainingImageClick,
    handleProceedToPayment,
    handlePaymentSuccess,
    handlePaymentCancel,
    handleBackFromArticleDetail,
    handleBackFromTrainingDetail,
    closeRegistrationModal,
    onTabChange,
    onSearchChange,
    onArticlePurchase,
    onArticleClick,
    onTrainingRegister,
    onTrainingClick
  ]);

  return (
    <TrainingResourcesContext.Provider value={contextValue}>
      {children}
    </TrainingResourcesContext.Provider>
  );
}

// Export types for external use
export type { RegistrationFormData, TrainingResourcesContextType, TrainingResourcesProviderProps };