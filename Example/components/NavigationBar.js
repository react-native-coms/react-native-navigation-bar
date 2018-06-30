/**
 * chengbing
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

const returnTrue = () => true;

export default class NavigationBar extends Component {

    static propTypes = {
        navigators: PropTypes.array,
        onSelect: PropTypes.func,
        onUp: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.lastSelectedIndex = null;
        this.state = { text: '', isShow: false }
    }


    render() {
        let navArray = new Array(),srcNavs = this.props.navigators || [];
        for (let index = 0; index < srcNavs.length; index++) {
            navArray.push(
                <View ref={ 'navItem' + index } style={ styles.nav_item } pointerEvents='none' key={ index }>
                    <Text style={[styles.nav_text,srcNavs[index] == '热门' ? styles.ch_text : styles.en_text]}>{ srcNavs[index] }</Text>
                </View>);
        }

        return (
            <View pointerEvents='box-none' style={ styles.top_view }>
                { this.state.isShow ?
                    <View style={ styles.model_view }>
                        <View style={ styles.model_main }>
                            <Text style={ styles.model_text }>{ this.state.text }</Text>
                        </View>
                    </View> : null
                }
                <View style={ styles.container }
                      onStartShouldSetResponder={ returnTrue }
                      onMoveShouldSetResponder={ returnTrue }
                      onResponderGrant={ this.onGrantAndMove }
                      onResponderMove={ this.onGrantAndMove }
                      onResponderRelease={ this.onRelease } >
                    { navArray }
                </View>
            </View>
        )
    }

    onSelect(section, index, fromTouch) {
        this.props.onSelect && this.props.onSelect(section, index);

        if (!fromTouch) {
            this.lastSelectedIndex = null;
        }
    }

    componentWillUnmount() {
        //this.measureTimer && clearTimeout(this.measureTimer);
    }

    componentDidMount() {

        /*this.measureTimer = setTimeout(() => {
            const navItem = this.refs.navItem0;

            navItem.measure((x, y, width, height, pageX, pageY) => {
                this.measure = {
                    y: pageY,
                    height
                };
            })
        }, 500);*/
    }

    onGrantAndMove = (e) => {
        let ev = e.nativeEvent.touches[0];
        let targetY = ev.pageY;
        const {y, height} = (this.measure || {});
        if (!y || targetY < y) {
            return;
        }
        let index = Math.floor((targetY - y) / height);
        index = Math.min(index, this.props.navigators.length - 1);
        if (this.lastSelectedIndex !== index && index < this.props.navigators.length) {
            this.lastSelectedIndex = index;
            this.onSelect(this.props.navigators[index], index, true);
            this.setState({text: this.props.navigators[index], isShow: true});
        }
    }

    onRelease = () => {
        this.setState({ isShow: false });
        this.lastSelectedIndex = null;
        this.props.onUp && this.props.onUp();
    }
}

const styles = StyleSheet.create({
    top_view: {
        flex: 1,
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        left: 0
    },

    model_view: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        position: 'absolute',
        backgroundColor: 'transparent',
        right: 0,
        top: 0,
        bottom: 0,
        left: 0
    },

    model_main: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#666',
        width: 120,
        height: 80,
        borderRadius: 3
    },

    model_text: {
        fontSize: 40,
        color: '#fff',
    },

    container: {
        position: 'absolute',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        top: 0,
        bottom: 0,
        paddingTop: 90,
        paddingBottom: 100,
        width: 25,
    },

    nav_item: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    nav_text: {
        fontSize: 12,
        color: '#18A0F0'
    },
    ch_text: {
        fontSize: 11
    },
    en_text: {
        fontSize: 12
    }
});
