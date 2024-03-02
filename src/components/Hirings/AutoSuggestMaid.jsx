import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import "./AutoSuggest.css";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const AutocompleteInput = ({ onMaidIdSelected }) => {
  const [value, setValue] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = useCallback(async (value) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`api/v1/maids/?search=${value}`);
      const data = response.data;
      setSuggestions(data.map(maid => ({
        id: maid._id,
        label: maid.name,
        code: maid.code,
        image: maid.maidImg
      })).slice(0, 5));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const onChange = useCallback((event, { newValue }) => {
    setValue(newValue);
  }, []);

  const renderSuggestion = useMemo(() => (suggestion) => {
    return (
      <div className="suggestion-item">
        {suggestion.image && suggestion.image.includes("uploads/") ? (
          <img src={`${import.meta.env.VITE_API_URL}${suggestion.image}`} alt={suggestion.label} className="suggestion-image object-cover object-top" />
        ) : (
          <img src={`https://res.cloudinary.com/dtcz2zuev/image/upload/${suggestion.image}`} alt={suggestion.label} className="suggestion-image object-cover object-top" />
        )}
        <div>
          <div>{suggestion.label} ({suggestion.code})</div>
          <small>{suggestion.maidImg}</small>
        </div>
      </div>
    );
  }, []);

  const getSuggestionValue = useCallback((suggestion) => suggestion.label, []);

  const renderSuggestionsContainer = useMemo(() => ({ containerProps, children }) => {
    return (
      <div {...containerProps} className="suggestions-container mt-2">
        {children}
      </div>
    );
  }, []);

  const onSuggestionSelected = useCallback((event, { suggestion, method }) => {
    setValue(suggestion.label);
    setSelectedId(suggestion.id);
    onMaidIdSelected(suggestion.id);
  }, [onMaidIdSelected]);

  return (
    <div className="mb-4">
      <label className="form-label block text-xl">New Maid</label>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={({ value }) => fetchSuggestions(value)}
        onSuggestionsClearRequested={() => setSuggestions([])}
        getSuggestionValue={getSuggestionValue}
        renderInputComponent={inputProps => (
          <input
            {...inputProps}
            value={value}
            type="text"
            placeholder="Search Maids"
            className="w-full bg-[#E3E3E3] md:w-[26rem] h-[4rem] outline-none border-none rounded-lg px-2 py-2"
          />
        )}
        renderSuggestion={renderSuggestion}
        isLoading={isLoading}
        inputProps={{ value, onChange }}
        renderSuggestionsContainer={renderSuggestionsContainer}
        onSuggestionSelected={onSuggestionSelected}
      />
    </div>
  );
};
