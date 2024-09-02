import './kanban-table.css'

import React from 'react'

/**
 * Override lane header
 */
const KanbanooLaneHeader = ({label, cards, title, current, target, color}) => {

  var styleColor = { "borderTop": "solid 4px " + color }

  return (
    <div class="kbl-header kbl-header-ui-2024" style={styleColor}>
     <span class="kbl-title">{title}</span><span class="kbh-nr">({cards.length})</span>
    </div>
  )
}

export default KanbanooLaneHeader