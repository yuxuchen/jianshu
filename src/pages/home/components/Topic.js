import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TopicWrapper, TopicItem, TopicItemMore} from '../style';

class Topic extends PureComponent{
    render(){
        const { list } = this.props;
        return(
            <TopicWrapper>
                {
                    list.map((item) => (
                            <TopicItem key={ item.get('id') }>
                                <img alt=''
                                className = 'topic-pic'
                                src = {item.get('imgURL')}
                                />
                                {item.get('title')}
                            </TopicItem>
                        )
                    )
                }
                <TopicItemMore>
                    More Information &lt;
                </TopicItemMore>
            </TopicWrapper>
        )
    }
}



const mapState = (state) => ({
    list: state.getIn(['home','topicList'])
});

export default connect(mapState, null)(Topic);