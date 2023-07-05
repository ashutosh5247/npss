const Constants = {
  // baseUrl: 'http://216.48.186.201:8083/',
  baseUrl: 'http://ec2-3-108-55-158.ap-south-1.compute.amazonaws.com:8083/',

  api: {
    login: 'login',
    signUp: 'signUp',
    googleRegister: 'googleRegister',
    facebookRegister: 'facebookRegister',
    updateParent: 'updateParent',
    getParentData: 'getParentData',
    addChildInfo: 'addChildInfo',
    registerBaby: 'RegisterBaby',
    addChildGrowth: 'addChildGrowth',
    getActivityCategory: 'getActivityCategory',
    getActivityFromCategoryId: 'getActivityCategory/category',
    getdailyWits: 'getdailyWits',
    getActivityPlans: 'getActivityPlans',
    getAllPosts: 'getAllPost',
    getAllMyPosts: 'getAllMyPost',
    weDidIt: 'getActivityPlans/complete',
    uploadVideo: 'getActivityPlans/uploadVideo',
    getDashboardData: 'getdashboard',
    LikePost: 'likePost',
    likePostComments: 'likePostComments',
    UnlikePost: 'unLikePost',
    getSearchedPost: 'getSearchedPost',
    disLikePostComments: 'disLikePostComments',
    deletePost: 'deletePost',
    deleteComment: 'deleteComment',
    SharePost: 'SharePost',
    CommentPost: 'CommentPost',
    replyCommentPost: 'ReplyCommentPost',
    CreatePost: 'CreatePost',
    CheckPost: 'CheckPost',
    getAllComments: 'getAllComments',
    getChildInfo: 'getChildInfo',
    wedidit: 'getActivityPlans/complete',
    getActivityGraph: 'activityGraph',
  },
};

export default Constants;