import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = 'Select option...',
  className = '',
  buttonClassName = '',
  menuClassName = '',
  icon: Icon = null,
  disabled = false,
  align = 'left', // 'left' | 'right'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Normalize options to objects: { value, label, subLabel }
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return {
        value: opt.value ?? opt.id ?? opt.name,
        label: opt.label ?? opt.name ?? String(opt.value),
        subLabel: opt.subLabel ?? (opt.neighborhood ? opt.neighborhood.split('/')[0] : null),
        badge: opt.badge ?? null,
      };
    }
    return {
      value: opt,
      label: opt,
      subLabel: null,
      badge: null,
    };
  });

  const selectedOption = normalizedOptions.find(
    (opt) => String(opt.value) === String(value)
  );

  const handleSelect = (optVal) => {
    if (onChange) {
      // Return synthetic event-like object for backwards compatibility with e.target.value
      // or directly the value
      onChange({ target: { value: optVal } });
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "w-full bg-[#181515] border border-mughlai-gold/40 hover:border-mughlai-gold text-white text-xs rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-md transition focus:outline-none focus:ring-1 focus:ring-mughlai-gold cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
          buttonClassName
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate">
          {Icon && <Icon className="w-3.5 h-3.5 text-mughlai-gold shrink-0" />}
          <span className="truncate font-medium text-left">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.subLabel && (
            <span className="text-[11px] text-gray-400 font-normal shrink-0">
              ({selectedOption.subLabel})
            </span>
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 text-mughlai-gold shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Luxury Custom Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className={cn(
            "absolute mt-1.5 w-full min-w-[180px] max-w-[340px] bg-[#1A1616] border border-mughlai-gold/50 rounded-xl shadow-2xl shadow-black/90 max-h-60 overflow-y-auto py-1 z-50 animate-fadeIn backdrop-blur-md divide-y divide-white/5 scrollbar-thin scrollbar-thumb-mughlai-gold/30",
            align === 'right' ? 'right-0' : 'left-0',
            menuClassName
          )}
        >
          {normalizedOptions.map((opt) => {
            const isSelected = String(opt.value) === String(value);
            return (
              <button
                key={String(opt.value)}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                className={`w-full text-left px-3.5 py-2.5 text-xs transition flex items-center justify-between gap-2 cursor-pointer font-swiss group ${
                  isSelected
                    ? 'bg-gradient-to-r from-mughlai-red/40 to-mughlai-maroon/30 text-white font-bold border-l-2 border-mughlai-gold'
                    : 'text-gray-300 hover:text-white hover:bg-mughlai-red/20'
                }`}
              >
                <div className="flex flex-col min-w-0 pr-1">
                  <span className={`truncate ${isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                    {opt.label}
                  </span>
                  {opt.subLabel && (
                    <span className="text-[10.5px] text-[#A8A8A8] font-normal truncate">
                      {opt.subLabel}
                    </span>
                  )}
                </div>

                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-mughlai-gold shrink-0 animate-scaleIn" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
