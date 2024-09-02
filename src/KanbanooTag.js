import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {TagSpan} from './styles/KanbanooBase'

class KanbanooTag extends Component {
  render() {
    const {title, color, bgcolor, tagStyle, ...otherProps} = this.props
    const style = {color: color || 'white', backgroundColor: bgcolor || 'orange', ...tagStyle}
    return (
      <TagSpan style={style} {...otherProps}>
        {title}
      </TagSpan>
    )
  }
}

KanbanooTag.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  bgcolor: PropTypes.string,
  tagStyle: PropTypes.object
}

export default KanbanooTag