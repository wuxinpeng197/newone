import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

export default class About extends PureComponent {

  render () {
    const {data} = this.props;

    return (
      <div className="card">
        <div>
          <h4>{data.name}</h4>
        </div>
        <div className={'clearfix'}>
          <div className={'pull-left'}>
            <p>
              <img src={'/public/uploads/' + data.image} style={{width: 100, height: 100}}/>
            </p>
          </div>
          <div className={'pull-left'} style={{marginLeft: 20}}>
            <p>Price: {data.price}</p>
            <p>Created: {new Date(data.createTime).toLocaleString()}</p>
            <Link to={'/house/' + data._id}>View Detail...</Link>
          </div>
        </div>
      </div>
    );
  }

}
