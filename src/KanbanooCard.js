import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {
  MovableCardWrapper,
  CardHeader,
  CardRightContent,
  CardTitle,
  Detail,
  KanbanooTagsContainer,
	KanbanooIconsContainer
} from './styles/KanbanooBase'
import InlineInput from 'react-trello'
import KanbanooTag from './KanbanooTag'
import DeleteButton from 'react-trello'
import KanbanooIcons from './KanbanooIcons'

class KanbanooCard extends Component {
  onDelete = e => {
    this.props.onDelete()
    e.stopPropagation()
  }

  render()  {
    const {
      showDeleteButton,
      style,
      tagStyle,
      onClick,
      onDelete,
      onChange,
      className,
      id,
      title,
      label,
      description,
      tags,
      cardDraggable,
      editable,
			deadline,
			comments,
			numberAttachments,
      t
    } = this.props

    const updateCard = (card) => {
      onChange({...card, id})
    }

    return (
		  <MovableCardWrapper
        data-id={id}
        onClick={onClick}
        style={style}
        className={className}
      >
			  <CardHeader>
			    <CardTitle draggable={cardDraggable}>
            {editable ? <InlineInput value={title} border placeholder={t('placeholder.title')} resize='vertical' onSave={(value) => updateCard({title: value})} /> : title}
          </CardTitle>
        </CardHeader>
				<CardRightContent>
          {editable ? <InlineInput value={label} border placeholder={t('placeholder.label')} resize='vertical' onSave={(value) => updateCard({label: value})} /> : label}
        </CardRightContent>
				<Detail>
          {editable ? <InlineInput value={description} border placeholder={t('placeholder.description')} resize='vertical' onSave={(value) => updateCard({description: value})} /> : description}
        </Detail>
        {tags && tags.length> 0 && (
          <KanbanooTagsContainer>
          {tags.map(tag => (
              <KanbanooTag key={tag.title} {...tag} tagStyle={tagStyle} />
            ))}
          </KanbanooTagsContainer>
        )}
				<KanbanooIconsContainer>
					<KanbanooIcons deadline={deadline} comments={comments} numberAttachments={numberAttachments}tagStyle={tagStyle} />
				</KanbanooIconsContainer>
			</MovableCardWrapper>
    )
  }
}

					// {showDeleteButton && <DeleteButton onClick={this.onDelete} />}

KanbanooCard.propTypes = {
  showDeleteButton: PropTypes.bool,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  style: PropTypes.object,
  tagStyle: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array,
	deadline: PropTypes.string,
}

KanbanooCard.defaultProps = {
  showDeleteButton: true,
  onDelete: () => {},
  onClick: () => {},
  style: {},
  tagStyle: {},
  title: 'no title',
  description: '',
  label: '',
  tags: [],
  className: '',
	deadline: ''
}

export default KanbanooCard