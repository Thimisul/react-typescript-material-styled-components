import React from 'react';
import { createPlugin, ViewProps} from '@fullcalendar/react';
import { Fragment } from '@fullcalendar/core';

const CustomView = (props: ViewProps) => {


    return (
      <Fragment>
        <div style={{'display': 'flex'}}>
          {props.dateProfile.currentRange.start.toUTCString()}
        </div>
      </Fragment>
    );
  }

export default createPlugin({
  views: {
    custom: CustomView
  }
});