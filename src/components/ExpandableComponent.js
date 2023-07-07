import React, {useEffect, useState} from 'react';
// Import required components
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import Colors from '../Res/Utils/Colors';
import Constants from '../Res/Utils/Constants';
import Fonts from '../Res/Utils/Fonts';
import Modal from 'react-native-modal';
import Images from '../Res/Assets/Images/Index';
import {getData} from '../Res/Utils/CommonFunctions';
import {executePostRequest, showToast} from '../Res/Utils/ApiFunctions';
import CustomTextInput from './CustomTextInput';
import {Loader} from './Loader';
import StarRating from 'react-native-star-rating';
const ExpandableComponent = ({
  item,
  index,
  onClickFunction,
  key,
  navigation,
  onPlayVideo,
}) => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [markCompleted, setMarkCompleted] = useState(false);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [option, setOption] = React.useState(null);
  const [activityInd, setActivityInd] = React.useState(false);
  const [txtDesc, setTextDesc] = useState('');

  const [fileData, setFileData] = useState(null);
  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  const hitUploadVideoAPI = async () => {
    let userData = await getData('userData');
    let childData = await getData('childInfoData');
    let selectedChildIndex = await getData('selectedChildIndex');
    let childId = childData[selectedChildIndex].ChildId;

    let formData = new FormData();
    formData.append('parentId', userData.ParentID);
    formData.append('childId', childId);
    formData.append('activityId', item.data.actPlanId);
    formData.append('Video', fileData.uri);
    formData.append('VideoDesc', txtDesc);

    console.log('activity ->', JSON.stringify(item));
    console.log('body ->', JSON.stringify(formData));
  };

  const hitcompleteAPI = async () => {
    let userdata = await getData('userData');
    let header = {
      Authorization: userdata.token,
    };
    let childData = await getData('childInfoData');
    let selectedChildIndex = await getData('selectedChildIndex');
    let childId = childData[selectedChildIndex].ChildId;
    console.log('use-->', JSON.stringify(userdata));
    let body = {
      parentId: userdata.ParentID,
      childId: childId,
      activityId: item.data.actPlanId,
      emojiId: option,
    };
    console.log('use2 -->', JSON.stringify(body));
    try {
      let response = await executePostRequest(
        Constants.api.wedidit,
        header,
        body,
      );
      if (response.responseCode == 200) {
        console.log('reponse - ', response);
        setVisibleModal(false);
        showToast('Congratulations', 'Activity is successfully submitted');
        setMarkCompleted(true);
      } else {
        showToast('Invalid Session', response.responseJson.err, 1);
        setTimeout(() => {
          props.navigation.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
          });
        }, 100);
      }
    } catch (e) {
      setVisibleModal(false);
      console.log('error - ', e);
    }
  };

  const _renderButton = text => (
    <View style={{paddingBottom: 10}}>
      <TouchableOpacity
        onPress={async () => {
          if (option !== null && text == 'Continue') {
            setVisibleModal(false);
            setActivityInd(true);
            await hitcompleteAPI();
            setActivityInd(false);
          } else if (fileData != null || txtDesc.length > 0) {
            setActivityInd(true);
            await hitUploadVideoAPI();
            setActivityInd(false);
          } else {
            setVisibleModal(true);
          }
        }}
        disabled={
          (option == null && text == 'Continue') ||
          (text == 'Submit' && (txtDesc.length == 0 || fileData == null))
        }
        style={[
          styles.button,
          {
            backgroundColor:
              text == 'Upload Video'
                ? Colors.carrotRed
                : text == 'Continue'
                ? option == null
                  ? Colors.lightGrey
                  : Colors.themeColor
                : text == 'Submit'
                ? txtDesc.length == 0 || fileData == null
                  ? Colors.lightGrey
                  : Colors.themeColor
                : Colors.themeColor,
          },
        ]}>
        <Text style={styles.buttontext}>{text}</Text>
      </TouchableOpacity>
    </View>
  );

  const _renderRatingModal = () => (
    <>
      <View style={styles.modalContent}>
        <View style={styles.modalHeading}>
          <Text style={styles.modalHeadingText}>Awesome!</Text>
        </View>
        <View style={styles.modalView}>
          <Text style={styles.modalHeadingSubText}>
            You are doing great. Keep Going!
          </Text>
        </View>
        <View style={styles.modalView2}>
          <View style={styles.center}>
            <Text style={styles.modalHeadingSubText}>
              How was the activity?
            </Text>
          </View>
          <View style={styles.subheading3}>
            <TouchableOpacity
              style={styles.center}
              onPress={() => {
                setOption(0);
                console.log('here 0');
                setVisibleModal(true);
              }}
              activeOpacity={0.7}>
              <Image style={styles.circleimg} source={Images.happy} />
              <Text
                style={[
                  styles.subheadingtext,
                  {
                    color: option == 0 ? Colors.themeColor : Colors.textGrey,
                  },
                ]}>
                Very Easy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.center}
              onPress={() => {
                setOption(1);
                console.log('here 1');
                setVisibleModal(true);
              }}
              activeOpacity={0.7}>
              <Image style={styles.circleimg} source={Images.neutral} />
              <Text
                style={[
                  styles.subheadingtext,
                  {
                    color: option == 1 ? Colors.themeColor : Colors.textGrey,
                  },
                ]}>
                Just Right
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.center}
              onPress={() => {
                setOption(2);
                console.log('here 2');
                setVisibleModal(true);
              }}
              activeOpacity={0.7}>
              <Image style={styles.circleimg} source={Images.sad} />
              <Text
                style={[
                  styles.subheadingtext,
                  {
                    color: option == 2 ? Colors.themeColor : Colors.textGrey,
                  },
                ]}>
                Too Tough
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {_renderButton('Continue')}
      </View>
      {activityInd && visibleModal && <Loader />}
    </>
  );

  const _renderUploadModal = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.modalContent}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeading2}>
          <Text style={styles.modalHeadingText}>Upload Video</Text>
        </View>
        <View style={styles.modalView3}>
          {fileData == null ? (
            <TouchableOpacity
              style={styles.modalView2sub}
              activeOpacity={0.6}
              onPress={async () => {
                let options = {
                  mediaType: 'video',
                };
                const result = await launchImageLibrary(options);
                console.log('image picker result - ', result);
                if (result.assets) {
                  console.log('image picker asset - ', result.assets[0]);
                  setFileData({...result.assets[0]});
                }
              }}>
              <Image style={Styles.img} source={Images.upload} />
              <Text style={Styles.modalHeadingSubText2}>
                Upload your activity video
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                height: 80,
                width: 80,
                borderRadius: 15,
                marginHorizontal: 15,
              }}>
              <Video
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 8,
                  borderColor: Colors.lightGrey,
                  borderWidth: 1,
                }}
                source={{uri: fileData.uri}}
                paused
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: -5,
                  top: -5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 25,
                  width: 25,
                  backgroundColor: Colors.carrotRed,
                  borderRadius: 15,
                }}
                activeOpacity={0.7}
                onPress={() => {
                  setFileData(null);
                }}>
                <Image
                  style={{height: 18, width: 18, tintColor: Colors.white}}
                  source={Images.crossIcon}
                />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.modalTextInputArea2}>
            <CustomTextInput
              placeholder={'Enter Description'}
              value={txtDesc}
              onChangeText={text => setTextDesc(text)}
              isRequired
              multiline
              numberOfLines={2}
              style={{minHeight: 80}}
            />
          </View>
        </View>

        {_renderButton('Submit')}
      </View>
      {activityInd && visibleModal && <Loader />}
    </KeyboardAvoidingView>
  );

  const ExpandedView = () => {
    return (
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
          // borderRadius: 15,
          paddingTop: item.isExpanded ? 10 : 0,
          backgroundColor: Colors.white,
        }}>
        {/*Content under the header of the Expandable List Item*/}
        <View key={key} style={styles.content}>
          <View>
            <Image
              style={styles.imgContent}
              source={{
                uri: item.data.thumbnail
                  ? Constants.baseUrl + item.data.thumbnail
                  : '',
              }}
            />
            {(item.data.fileType == 'mp4' ||
              item.data.fileType == 'wmv' ||
              item.data.fileType == 'mov' ||
              item.data.fileType == 'flv' ||
              item.data.fileType == '3gp') && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                activeOpacity={0.7}
                onPress={() => {
                  onPlayVideo(item.data.filePath);
                }}>
                <Image
                  style={styles.itemVideoButton}
                  source={Images.playIcon}
                />
              </TouchableOpacity>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                height: 25,
                borderRadius: 15,
                backgroundColor: Colors.darkYellow,
                marginTop: -10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{height: 12, width: 12}}
                  resizeMode={'contain'}
                  source={Images.heartIcon}
                />
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: Fonts.RobotoRegular,
                    fontWeight: '400',
                    fontSize: 12,
                    marginLeft: 5,
                  }}>
                  {'1.2k'}
                </Text>
              </View>
              <StarRating
                starSize={12}
                starStyle={{columnGap: 5, width: 15}}
                fullStarColor={Colors.limeYellow}
                rating={5}
              />
            </View>
          </View>
          <View style={{paddingHorizontal: 15}}>
            <Text style={styles.txtHeading}>{'Area and Age'}</Text>
            <Text style={styles.txtDesc}>{item.data.areaAge}</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <FlatList
                style={{marginTop: 3}}
                data={[
                  {title: 'Physical', color: Colors.lightGreen},
                  {title: 'Social', color: Colors.lightPurple},
                  {title: 'Social', color: Colors.lightPurple},
                  {title: 'Physical', color: Colors.lightGreen},
                ]}
                numColumns={2}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        backgroundColor: item.color,
                        borderRadius: 15,
                        height: 25,
                        width: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 3,
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          textAlign: 'center',
                          fontSize: 12,
                          fontFamily: Fonts.RobotoRegular,
                        }}>
                        {item.title}
                      </Text>
                    </View>
                  );
                }}
              />

              <TouchableOpacity
                style={{
                  height: 45,
                  width: 120,
                  borderRadius: 25,
                  backgroundColor: Colors.themeColor,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.buttontext}>{'Start'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Modal
          isVisible={visibleModal}
          style={styles.bottomModal}
          onBackdropPress={() => {
            setVisibleModal(false);
            setFileData(null);
            setTextDesc('');
          }}>
          {!markCompleted ? _renderRatingModal() : _renderUploadModal()}
        </Modal>
        {activityInd && <Loader />}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors.skyBlue,
        },
      ]}>
      <TouchableOpacity
        style={[styles.header]}
        onPress={onClickFunction}
        activeOpacity={0.9}>
       
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={styles.headerImage}
            source={{uri: Constants.baseUrl + item.thumbnail}}
          />
          {(item.data.fileType == 'mp4' ||
            item.data.fileType == 'wmv' ||
            item.data.fileType == 'mov' ||
            item.data.fileType == 'flv' ||
            item.data.fileType == '3gp') && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              activeOpacity={0.7}
              onPress={() => {
                onPlayVideo(item.data.filePath);
              }}>
              <Image style={styles.itemVideoButton} source={Images.playIcon} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.headerText} numberOfLines={3}>
          {item.title}
        </Text>
      </TouchableOpacity>
      <ExpandedView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  titleText: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemVideoButton: {
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 15,
    fontFamily: Fonts.GothicBold,
    color: Colors.black,
    marginLeft: 20,
    flex: 1,
    lineHeight: 22,
  },
  headerImage: {
    height: 80,
    width: 80,
    borderRadius: 10,
    backgroundColor: Colors.lighterGrey,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    backgroundColor: Colors.white,
    minHeight: 50,
    borderWidth: 1,
    borderColor: Colors.textInputBorder,
    borderRadius: 15,
    overflow: 'hidden',
  },
  txtTitle: {marginTop: 10, fontFamily: Fonts.GothicBold, fontSize: 16},
  imgContent: {
    height: 150,
    backgroundColor: Colors.lighterGrey,
  },

  txtDesc: {
    marginTop: 5,
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    textAlign: 'justify',
    color: Colors.black,
  },
  modalView3: {
    marginVertical: 10,
  },
  modalView2sub: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: Colors.themeColor,
    height: 50,
    marginVertical: 20,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalHeadingSubText2: {
    color: Colors.black,
    fontSize: 16,
    marginLeft: 5,
  },
  buttontext: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.GothicBold,
  },
  button: {
    backgroundColor: Colors.themeColor,
    padding: 12,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttontext: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '500',
  },
  modalContent: {
    backgroundColor: 'white',
  },
  modalHeading: {
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView2: {
    marginVertical: 10,
    justifyContent: 'center',
  },
  modalTextInputArea: {
    height: 50,
  },
  modalHeadingText: {
    color: Colors.black,
    fontSize: 20,

    fontWeight: '600',
  },
  modalHeadingSubText: {
    color: Colors.black,
    fontSize: 18,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
    // backgroundColor: 'pink',
  },
  txtHeading: {
    marginTop: 15,
    fontFamily: Fonts.RobotoRegular,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 25,
    textAlign: 'justify',
    color: Colors.black,
  },
  circleimg: {
    // backgroundColor: 'red',
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  subheading3: {
    height: 50,
    marginTop: 30,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headingtext: {
    color: Colors.black,
    fontSize: 35,
    fontWeight: '500',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subheadingtext: {
    color: Colors.textGrey,
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '500',
    margin: 5,
  },
  modalHeading2: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  modalTextInputArea2: {
    marginTop: 10,
  },
  subheadingtext2: {
    color: Colors.textGrey,
    fontSize: 13,
    fontFamily: Fonts.GothicRegular,
  },
});

export default ExpandableComponent;
