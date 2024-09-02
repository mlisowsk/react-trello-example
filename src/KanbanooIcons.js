import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
	KanbanooDeadlineIcon,
	KanbanooCommentsIcon,
	KanbanooAttachmentsIcon
} from './styles/KanbanooBase'


	/**
	 * Calculate for "theDate" the number of days difference from today, where:
	 * >0 theDate is in the future; 0: theDate is today; <0 theDate is in the past
	 * the maginute of the return parameter is an integer number of days, counted
	 * from midnight to midnight of theDate and today.
	 *	@param {Date} theDate - a Date object to compare against today
	 *	@returns {number} N>0 theDate is N days in the future; 0: theDate is today;
	 *		N<0 theDate is N days in the past
	 **/

const daysToToday	= function (theDate) {

		if (theDate !== undefined && theDate != null) {
			theDate.setHours(0);
			theDate.setMinutes(0);
			theDate.setSeconds(0);
			theDate.setMilliseconds(0);
			return (Math.round((theDate - new Date()) / 86400000));
		}
		else return undefined;
}

class KanbanooIcons extends Component {
  render() {
    const {deadline, comments, numberAttachments, ...otherProps} = this.props

		const daysToDeadline = deadline ? daysToToday(new Date(deadline)) : undefined;
		var deadlineClass = "kbt-due-ok";
		if (daysToDeadline === 0)
			deadlineClass = "kbt-duetoday";	// special color for deadline == today
		else if (daysToDeadline < 0)
			deadlineClass = "kbt-overdue";

    return (
			<>
				{deadline ?
					<KanbanooDeadlineIcon className={deadlineClass} {...otherProps}>
						{deadline}
					</KanbanooDeadlineIcon> : ''}
				{comments ?
					<KanbanooCommentsIcon className='kbti-comment-icon' {...otherProps}>
						{comments.length}
					</KanbanooCommentsIcon>				: ''}
				{numberAttachments ?
					<KanbanooAttachmentsIcon className='kbti-clip-icon' {...otherProps}>
						{numberAttachments}
					</KanbanooAttachmentsIcon>				: ''}
			</>
    )
  }
}

KanbanooIcons.propTypes = {
	deadline: PropTypes.string,
	comments: PropTypes.array,
	numberAttachments: PropTypes.number,
  color: PropTypes.string,
  bgcolor: PropTypes.string
}

export default KanbanooIcons