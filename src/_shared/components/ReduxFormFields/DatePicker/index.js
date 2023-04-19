import React, { forwardRef, Fragment, useRef, useState } from 'react';
import { Input, UncontrolledTooltip } from 'reactstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import './style.scss';

const DatePickr = ({
                       className,
                       input,
                       name,
                       placeholder,
                       minDate,
                       maxDate,
                       value,
                       onChange,
                       selectedDate,
                       showError,
                       disabledKeyboardNavigation,
                       fixedHeight,
                       useYear,
                       useFilterOptions,
                       yearRange,
                       openToDate,
                       addTime = false,
                       when,
                       minAge,
                       meta,
                       ...rest
                   }) => {

    const [startDate, setStartDate] = useState(
        when.previous
            ? new Date(
            Object.prototype.toString.call(selectedDate) === '[object Date]'
                ? selectedDate
                : new Date(),
            )
            : new Date(
            moment(
                Object.prototype.toString.call(selectedDate) === '[object Date]'
                    ? selectedDate
                    : new Date(),
            ).add(1, 'days')
                .valueOf(),
            ),
    );
    const [year, setYear] = useState(
        new Date(
            new Date(new Date().setFullYear(new Date().getFullYear() - minAge)),
        ).getFullYear(),
    );
    const datePicker = useRef(null);
    const inputRef = useRef(null);
    const yearPickerRef = useRef(null);

    const handleChange = date => {
        setStartDate(new Date(date.valueOf()));

        input
            ? input.onChange(new Date(date.valueOf()))
            : onChange(new Date(date.valueOf()));
    };

    function getYear(date) {
        return date.getFullYear();
    }

    function getMonth(date) {
        return date.getMonth();
    }

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <div onClick={onClick} className={`datepickr-container ` + className}>
            <Input
                className="filter-datepicker"
                onClick={onClick}
                placeholder={placeholder ? placeholder : 'Select date'}
                value={
                    input && input.value
                        ? moment(new Date(input.value).toISOString())
                            .format(`LL ${addTime ? 'h:mm a' : ''}`)
                        : 'Click to select a date'
                }
                name={name}
                readOnly={true}
                ref={ref}
            />
        </div>
    ));

    return (
        <>
            <DatePicker
                className={`date`}
                ref={datePicker}
                selected={
                    input && input.value
                        ? new Date(input.value)
                        : selectedDate
                        ? new Date(selectedDate.valueOf())
                        : startDate
                }
                showTimeSelect={addTime}
                timeFormat="HH:mm"
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm: aa"
                onChange={date => {
                    handleChange(new Date(date));
                }}
                popperPlacement={'bottom end'}
                popoverTargetAttachment="bottom end"
                fixHeight={fixedHeight}
                customInput={<CustomInput ref={inputRef}/>}
                disbaledKeyboardNavigation={disabledKeyboardNavigation}
                min={
                    minDate
                        ? Object.prototype.toString.call(minDate) === '[object Date]'
                        ? minDate
                        : null
                        : null
                }
                max={
                    maxDate
                        ? Object.prototype.toString.call(maxDate) === '[object Date]'
                        ? maxDate
                        : null
                        : null
                }
                renderCustomHeader={({
                                         date,
                                         decreaseMonth,
                                         increaseMonth,
                                         prevMonthButtonDisabled,
                                         nextMonthButtonDisabled,
                                         changeYear,
                                     }) => {
                    return (
                        <Fragment>
                            <div className={'custom-datepicker-nav'}>
                                <button
                                    onClick={() => {
                                        setYear(getYear(date));
                                        decreaseMonth();
                                    }}
                                    disabled={prevMonthButtonDisabled}
                                    className={'custom-dp-btn'}
                                    type={'button'}
                                >
                                    <i className={'fa fa-chevron-left'}/>
                                </button>
                                <span>
                                <strong>
                                    {months[getMonth(date)]} {getYear(date)}
                                </strong>
                            </span>
                                <button
                                    onClick={() => {
                                        increaseMonth();
                                        setYear(getYear(date));
                                    }}
                                    disabled={nextMonthButtonDisabled}
                                    type={'button'}
                                    className={'custom-dp-btn'}
                                >
                                    <i className={'fa fa-chevron-right'}/>
                                </button>
                            </div>
                            {useYear && (
                                <div className={'yearpicker'}>
                                    <Input
                                        type="select"
                                        name="select"
                                        id="datepicker-select"
                                        onChange={e => {
                                            const year = Number(e.target.value);
                                            changeYear(year);
                                            setYear(year);
                                        }}
                                        defaultValue={
                                            input && input.value
                                                ? new Date(input.value).getFullYear()
                                                : new Date(startDate).getFullYear()
                                        }
                                        ref={yearPickerRef}
                                    >
                                        {Array.from(
                                            Array(typeof  yearRange === 'number' ? Number(yearRange) : 60)
                                                .keys(),
                                        ).map((value, index) =>
                                            value - (typeof yearRange === 'number' ? Number(yearRange) : 60) / 2,
                                        ).map(value => {
                                            const maxYear = maxDate
                                                ? maxDate.getFullYear()
                                                : new Date(new Date().setFullYear(new Date().getFullYear() - minAge))
                                                    .getFullYear();
                                            const currentYear = new Date().getFullYear();
                                            return (
                                                <option
                                                    value={currentYear}
                                                    key={currentYear - value}
                                                    disabled={currentYear - value > maxYear}
                                                    style={{
                                                        color: currentYear - value > maxYear ? 'rgba(0, 0, 0, 0.3)' : 'black',
                                                    }}
                                                >
                                                    {currentYear - value}
                                                </option>
                                            );
                                        })}
                                    </Input>
                                </div>
                            )}
                        </Fragment>
                    );
                }}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                {...rest}
            >
                {useFilterOptions && (
                    <div className={'date-filter-options'}>
                    <span
                        id={'today'}
                        onClick={() => {
                            handleChange(new Date());
                        }}
                        className={'filter-option'}
                    >
                        <UncontrolledTooltip placement="top" target="today">
                            Today
                        </UncontrolledTooltip>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fal"
                            data-icon="calendar-day"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="filter-datepicker-icon vm-padding"
                        >
              <path
                  fill="currentColor"
                  d="M400 64h-48V8c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v56H128V8c0-4.4-3.6-8-8-8h-16c-4.4 0-8 3.6-8 8v56H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V192h384v272zm0-304H32v-48c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v48zM112 384h96c8.8 0 16-7.2 16-16v-96c0-8.8-7.2-16-16-16h-96c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16zm16-96h64v64h-64v-64z"
                  className="vm-fill"
              />
            </svg>
                    </span>
                        <span
                            onClick={() => {
                                handleChange(
                                    when.previous ? moment().subtract(1, 'day')
                                        : moment().add(1, 'day'),
                                );
                            }}
                            id={'next-day'}
                            className={'filter-option'}
                        >
                        <UncontrolledTooltip placement="top" target="next-day">
                            {when.previous ? 'Yesterday' : 'Tomorrow'}
                        </UncontrolledTooltip>
                        <svg
                            className="filter-datepicker-icon"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
              <g
                  className="filter-datepicker-icon"
                  fill="none"
                  fillRule="evenodd"
              >
                <path
                    className="vm-stroke"
                    d="M16.6206319,16.913856 C16.8650819,16.3243398 17,15.6779258 17,15 C17,12.2385763 14.7614237,10 12,
              10 C9.23857625,10 7,12.2385763 7,15 C7,15.6779258 7.13491807,16.3243398 7.37936812,16.913856"
                    strokeWidth="2"
                />
                <path
                    className="vm-fill"
                    d="M24,15 C24,15.5522847 23.5522847,16 23,16 L21,16 C20.4477153,16 20,15.5522847 20,15 C20,
              14.4477153 20.4477153,14 21,14 L23,14 C23.5522847,14 24,14.4477153 24,15 Z M4,15 C4,15.5522847 3.55228475,
              16 3,16 L1,16 C0.44771525,16 0,15.5522847 0,15 C0,14.4477153 0.44771525,14 1,14 L3,14 C3.55228475,14 4,
              14.4477153 4,15 Z"
                />
                <path
                    className="vm-fill"
                    d="M6.92893219,7.92893219 C6.92893219,8.48121694 6.48121694,
              8.92893219 5.92893219,8.92893219 L3.92893219,8.92893219 C3.37664744,8.92893219 2.92893219,8.48121694 2.92893219,
              7.92893219 C2.92893219,7.37664744 3.37664744,6.92893219 3.92893219,6.92893219 L5.92893219,6.92893219 C6.48121694,
              6.92893219 6.92893219,7.37664744 6.92893219,7.92893219 Z"
                    transform="rotate(45 4.93 7.93)"
                />
                <path
                    className="vm-fill"
                    d="M14,5 C14,5.55228475 13.5522847,6 13,6 L11,6 C10.4477153,6 10,5.55228475 10,5 C10,4.44771525 10.4477153,
              4 11,4 L13,4 C13.5522847,4 14,4.44771525 14,5 Z"
                    transform="rotate(90 12 5)"
                />
                <path
                    className="vm-fill"
                    d="M21.0710678,7.92893219 C21.0710678,8.48121694 20.6233526,8.92893219 20.0710678,8.92893219 L18.0710678,
              8.92893219 C17.5187831,8.92893219 17.0710678,8.48121694 17.0710678,7.92893219 C17.0710678,7.37664744 17.5187831,
              6.92893219 18.0710678,6.92893219 L20.0710678,6.92893219 C20.6233526,6.92893219 21.0710678,7.37664744 21.0710678,
              7.92893219 Z"
                    transform="rotate(135 19.07 7.93)"
                />
                <rect className="vm-fill" height="2" rx="1" width="24" y="19"/>
              </g>
            </svg>
                    </span>
                        <span
                            onClick={() => {
                                handleChange(
                                    when.previous
                                        ? moment().subtract(7, 'day')
                                        : moment().add(7, 'day'),
                                );
                            }}
                            id={'last-seven'}
                            className={'filter-option'}
                        >
                        <UncontrolledTooltip placement="top" target="last-seven">
                            {when.previous ? 'Last seven days' : 'Next seven days'}
                        </UncontrolledTooltip>
                        <svg
                            className="filter-datepicker-icon vm-reduce"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
              <g fill="none" fillRule="evenodd">
                <rect
                    className="vm-stroke"
                    height="20"
                    rx="2"
                    strokeWidth="2"
                    width="22"
                    x="1"
                    y="3"
                />
                <path
                    className="vm-fill"
                    d="M9.3 17L11.7 17 15.1 10.9 15.1 9.3 9.1 9.3 9.1 11.1 12.7 11.1"
                />
                <rect className="vm-fill" height="5" rx="1" width="2" x="5"/>
                <rect className="vm-fill" height="5" rx="1" width="2" x="17"/>
              </g>
            </svg>
                    </span>
                        <span
                            onClick={() => {
                                handleChange(
                                    when.previous
                                        ? moment().subtract(1, 'month')
                                        : moment().add(1, 'month'),
                                );
                            }}
                            id={'month'}
                            className={'filter-option'}
                        >
                        <UncontrolledTooltip placement="top" target="month">
                            {when.previous ? 'Last month' : 'Next month'}
                        </UncontrolledTooltip>
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fal"
                            data-icon="calendar-alt"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="filter-datepicker-icon vm-padding"
                        >
              <path
                  fill="none"
                  d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"
                  className="vm-fill"
              />
            </svg>
                    </span>
                        <span
                            onChange={() => {
                                handleChange(
                                    when.previous ? moment().subtract(1, 'year')
                                        : moment().add(1, 'year'),
                                );
                            }}
                            id={'year'}
                            className={'filter-option'}
                        >
                        <UncontrolledTooltip placement="top" target="year">
                            {when.previous ? 'Last year' : 'Next year'}
                        </UncontrolledTooltip>
                    </span>
                    </div>
                )}
            </DatePicker>
            {meta && showError && meta.touched && meta.error && (
                <div className="invalid-feedback d-block">{meta.error}</div>
            )}
        </>
    );
};

const datePickrDefaultProps = {
    when: {
        previous: true,
    },
    fixedHeight: false,
    disabledKeyboardNavigation: true,
    useYear: false,
    useFilterOptions: true,
    yearRange: 60,
    minAge: 18,
    showError: false,
};

DatePickr.defaultProps = datePickrDefaultProps;

export default DatePickr;
