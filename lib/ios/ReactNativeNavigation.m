#import "ReactNativeNavigation.h"

#import <React/RCTUIManager.h>

#import "RNNBridgeManager.h"
#import "RNNSplashScreen.h"
#import "RNNLayoutManager.h"

@interface ReactNativeNavigation()

@property (nonatomic, strong) RNNBridgeManager *bridgeManager;

@end

@implementation ReactNativeNavigation

# pragma mark - public API

+(void)bootstrap:(NSURL *)jsCodeLocation launchOptions:(NSDictionary *)launchOptions {
	[[ReactNativeNavigation sharedInstance] bootstrap:jsCodeLocation launchOptions:launchOptions];
}

+(void)bootstrap:(NSURL *)jsCodeLocation launchOptions:(NSDictionary *)launchOptions bridgeManagerDelegate:(id<RNNBridgeManagerDelegate>)delegate {
	[[ReactNativeNavigation sharedInstance] bootstrap:jsCodeLocation launchOptions:launchOptions bridgeManagerDelegate:delegate];
}

+ (void)registerExternalComponent:(NSString *)name callback:(RNNExternalViewCreator)callback {
	[[ReactNativeNavigation sharedInstance].bridgeManager registerExternalComponent:name callback:callback];
}

+ (RCTBridge *)getBridge {
	return [[ReactNativeNavigation sharedInstance].bridgeManager bridge];
}

+ (UIViewController *)findViewController:(NSString *)componentId {
    return [RNNLayoutManager findComponentForId:componentId];
}

+ (void)setJSCodeLocation:(NSURL *)jsCodeLocation {
	[[ReactNativeNavigation sharedInstance].bridgeManager setJSCodeLocation:jsCodeLocation];
}

# pragma mark - instance

+ (instancetype) sharedInstance {
	static ReactNativeNavigation *instance = nil;
	static dispatch_once_t onceToken = 0;
	dispatch_once(&onceToken,^{
		if (instance == nil) {
			instance = [[ReactNativeNavigation alloc] init];
		}
	});
	
	return instance;
}

-(void)bootstrap:(NSURL *)jsCodeLocation launchOptions:(NSDictionary *)launchOptions {
	[self bootstrap:jsCodeLocation launchOptions:launchOptions bridgeManagerDelegate:nil];
}

-(void)bootstrap:(NSURL *)jsCodeLocation launchOptions:(NSDictionary *)launchOptions bridgeManagerDelegate:(id<RNNBridgeManagerDelegate>)delegate {
	UIWindow* mainWindow = [self initializeKeyWindow];
	
	self.bridgeManager = [[RNNBridgeManager alloc] initWithJsCodeLocation:jsCodeLocation launchOptions:launchOptions bridgeManagerDelegate:delegate mainWindow:mainWindow];
	[RNNSplashScreen showOnWindow:mainWindow];
}

- (UIWindow *)initializeKeyWindow {
	UIWindow* keyWindow = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
	if (@available(iOS 13.0, *)) {
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && __IPHONE_OS_VERSION_MAX_ALLOWED >= 130000
		keyWindow.backgroundColor = [UIColor systemBackgroundColor];
#endif
	} else {
		keyWindow.backgroundColor = [UIColor whiteColor];
	}
	UIApplication.sharedApplication.delegate.window = keyWindow;
	
	return keyWindow;
}

@end
