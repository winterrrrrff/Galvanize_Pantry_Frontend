
import './DatePicker.css'
import React, { Component }from 'react';
import ModernDatepicker from 'react-modern-datepicker';
import dayjs from 'dayjs';
//import icon from '../assets/icon.png'; // if you want to show an icon

class DatePicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			startDate: new Date(), // can be any of these ['dayjs()', '', null, new Date(2018,12,1)]
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(date) {
		this.setState({
			startDate: date,
		});
	}

	render() {
		return (
			<ModernDatepicker
				//date={this.state.startDate}
				format={'DD-MM-YYYY'}
				showBorder
				className="color"
				id="someId"
				
				maxDate={dayjs().add('1', 'day')} // can be a javascript date object also (new Date(2018,12,12))
				minDate={dayjs().subtract('2', 'day')}// can be a javascript date object also (new Date(2018,12,1))
				onChange={date => this.handleChange(date)}
				placeholder={'Select a date'}
				primaryColor={'#d9b44a'}
				secondaryColor={'#75b1a9'}
				primaryTextColor={'#4f6457'}
				secondaryTextColor={'#acd0c0'}
			/>
		);
	}
}

export default DatePicker;