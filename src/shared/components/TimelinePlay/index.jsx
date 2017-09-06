import React from 'react';
import PropTypes from 'prop-types';
import Timeline from 'react-calendar-timeline/lib';
import moment from 'moment';
import './styles.css';

/**
 * Renders the timeline on /dashboard/map route.
 * //TODO: This needs considerable thought and rework.
 */
const TimelinePlay = ({
  items,
  groups,
}) => (
  <div className="timeline">
    <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={moment().add(0, 'hour')}
      defaultTimeEnd={moment().add(12, 'hour')}
      lineHeight={80}
      sidebarWidth={0}
      stackItems
      style={{
        width: '100%',
        height: '100%',
      }}
      itemRenderer={
        ({ item }) => (
          <div className={`${item.color}SideBorder`}>
            {item.title}
          </div>
        )}
    />
  </div>
);

TimelinePlay.defaultProps = {
  items: [
    { id: 1, group: 1, color: 'red', title: 'item 1', start_time: moment(), end_time: moment().add(4, 'hour') },
    { id: 2, group: 1, color: 'green', title: 'item 2', start_time: moment().add(0.2, 'hour'), end_time: moment().add(5, 'hour') },
    { id: 3, group: 1, color: 'green', title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(6, 'hour') },
  ],
  groups: [
    { id: 1, title: 'group 1' },
  ],
};

TimelinePlay.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  groups: PropTypes.arrayOf(PropTypes.shape({})),
};

export default TimelinePlay;
