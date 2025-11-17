'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Calendar, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const DateRangeFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '');
  const [selectedMonth, setSelectedMonth] = useState(searchParams.get('month') || '');
  
  // Parse month into separate month and year
  const [filterMonth, setFilterMonth] = useState(() => {
    if (selectedMonth) {
      const [year, month] = selectedMonth.split('-');
      return month;
    }
    return '';
  });
  
  const [filterYear, setFilterYear] = useState(() => {
    if (selectedMonth) {
      const [year] = selectedMonth.split('-');
      return year;
    }
    return new Date().getFullYear().toString();
  });

  // Month names
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  // Generate year options (last 5 years + current + next 2 years)
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 2; i++) {
      years.push(i.toString());
    }
    return years;
  };

  const years = generateYears();

  // Update selectedMonth when month or year changes
  const handleMonthYearChange = (month: string, year: string) => {
    if (month && year) {
      setSelectedMonth(`${year}-${month}`);
    } else {
      setSelectedMonth('');
    }
  };

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    
    if (startDate) {
      params.set('startDate', startDate);
    } else {
      params.delete('startDate');
    }
    
    if (endDate) {
      params.set('endDate', endDate);
    } else {
      params.delete('endDate');
    }
    
    if (selectedMonth) {
      params.set('month', selectedMonth);
    } else {
      params.delete('month');
    }
    
    replace(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    setSelectedMonth('');
    setFilterMonth('');
    setFilterYear(new Date().getFullYear().toString());
    const params = new URLSearchParams(searchParams);
    params.delete('startDate');
    params.delete('endDate');
    params.delete('month');
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  };

  const handleMonthChange = (month: string) => {
    setFilterMonth(month);
    handleMonthYearChange(month, filterYear);
    if (month) {
      // Clear date range when month is selected
      setStartDate('');
      setEndDate('');
    }
  };

  const handleYearChange = (year: string) => {
    setFilterYear(year);
    handleMonthYearChange(filterMonth, year);
    if (year && filterMonth) {
      // Clear date range when year is selected
      setStartDate('');
      setEndDate('');
    }
  };

  const handleDateChange = () => {
    // Clear month when date range is used
    if (startDate || endDate) {
      setSelectedMonth('');
    }
  };

  useEffect(() => {
    handleDateChange();
  }, [startDate, endDate]);

  const hasActiveFilter = startDate || endDate || selectedMonth;

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 bg-white p-2 rounded-lg border-2 border-gray-200">
      <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
        <Calendar className="h-3.5 w-3.5 text-brand-teal flex-shrink-0" />
        <span className="whitespace-nowrap">Filter by Date:</span>
      </div>
      
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 flex-1">
        {/* Month and Year Selectors */}
        <div className="flex items-center gap-1">
          <label className="text-xs font-medium text-gray-600 whitespace-nowrap">
            Month:
          </label>
          <select
            id="monthSelect"
            value={filterMonth}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="w-24 rounded border-2 border-gray-200 px-2 py-1 text-xs outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 transition-all bg-white"
          >
            <option value="">Select</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
          
          <select
            id="yearSelect"
            value={filterYear}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-20 rounded border-2 border-gray-200 px-2 py-1 text-xs outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 transition-all bg-white"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <span className="hidden lg:inline text-gray-400 text-xs self-center px-1">or</span>

        {/* Date Range */}
        <div className="flex items-center gap-1">
          <label htmlFor="startDate" className="text-xs font-medium text-gray-600 whitespace-nowrap">
            From:
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={!!selectedMonth}
            className="w-32 rounded border-2 border-gray-200 px-2 py-1 text-xs outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        
        <div className="flex items-center gap-1">
          <label htmlFor="endDate" className="text-xs font-medium text-gray-600 whitespace-nowrap">
            To:
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={!!selectedMonth}
            className="w-32 rounded border-2 border-gray-200 px-2 py-1 text-xs outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal/20 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={handleFilter}
          className="flex-1 sm:flex-none px-3 py-1 text-xs font-medium text-white bg-brand-teal hover:bg-brand-teal/90 rounded transition-all whitespace-nowrap"
        >
          Apply
        </button>
        
        {hasActiveFilter && (
          <button
            onClick={handleClear}
            className="flex items-center justify-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded transition-all"
            title="Clear filters"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DateRangeFilter;
