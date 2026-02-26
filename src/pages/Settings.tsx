import { useState, useEffect } from 'react';
import { Bell, Shield, Palette, Globe, Database, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface NotificationSettings {
  newMessages: boolean;
  studyGroupUpdates: boolean;
  aiRecommendations: boolean;
  achievementUpdates: boolean;
  weeklyDigest: boolean;
  emailNotifications: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  showLearningProgress: boolean;
  showAchievements: boolean;
  allowDirectMessages: boolean;
  showOnlineStatus: boolean;
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  compactMode: boolean;
  animationsEnabled: boolean;
}

export function Settings() {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [notifications, setNotifications] = useState<NotificationSettings>({
    newMessages: true,
    studyGroupUpdates: true,
    aiRecommendations: false,
    achievementUpdates: true,
    weeklyDigest: true,
    emailNotifications: false
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showLearningProgress: true,
    showAchievements: true,
    allowDirectMessages: true,
    showOnlineStatus: true
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: 'system',
    language: 'en',
    compactMode: false,
    animationsEnabled: true
  });

  const [accountData, setAccountData] = useState({
    email: '',
    username: '',
    displayName: ''
  });

  useEffect(() => {
    if (user) {
      loadAccountData();
    }
  }, [user]);

  const loadAccountData = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('username, display_name')
      .eq('user_id', user.id)
      .single();
    
    setAccountData({
      email: user.email || '',
      username: data?.username || user.email?.split('@')[0] || '',
      displayName: data?.display_name || user.email?.split('@')[0] || '',
    });
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key: keyof PrivacySettings, value: any) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAppearanceChange = (key: keyof AppearanceSettings, value: any) => {
    setAppearance(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: accountData.username,
          display_name: accountData.displayName,
        })
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Save failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
    }
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data export initiated",
      description: "Your data export will be ready shortly. You'll receive an email with the download link.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion request",
      description: "Please contact support to proceed with account deletion.",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Settings
        </h1>
        <Button onClick={handleSaveSettings} className="bg-gradient-primary text-primary-foreground">
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Language</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Data</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Messages</Label>
                    <p className="text-sm text-muted-foreground">Get notified when someone sends you a message</p>
                  </div>
                  <Switch 
                    checked={notifications.newMessages}
                    onCheckedChange={() => handleNotificationChange('newMessages')}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Study Group Updates</Label>
                    <p className="text-sm text-muted-foreground">Notifications from your study groups</p>
                  </div>
                  <Switch 
                    checked={notifications.studyGroupUpdates}
                    onCheckedChange={() => handleNotificationChange('studyGroupUpdates')}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>AI Recommendations</Label>
                    <p className="text-sm text-muted-foreground">Personalized learning suggestions</p>
                  </div>
                  <Switch 
                    checked={notifications.aiRecommendations}
                    onCheckedChange={() => handleNotificationChange('aiRecommendations')}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Achievement Updates</Label>
                    <p className="text-sm text-muted-foreground">When you earn new badges or achievements</p>
                  </div>
                  <Switch 
                    checked={notifications.achievementUpdates}
                    onCheckedChange={() => handleNotificationChange('achievementUpdates')}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">Summary of your learning progress</p>
                  </div>
                  <Switch 
                    checked={notifications.weeklyDigest}
                    onCheckedChange={() => handleNotificationChange('weeklyDigest')}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={notifications.emailNotifications}
                    onCheckedChange={() => handleNotificationChange('emailNotifications')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <Select 
                    value={privacy.profileVisibility} 
                    onValueChange={(value: any) => handlePrivacyChange('profileVisibility', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can view</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private - Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Learning Progress</Label>
                    <p className="text-sm text-muted-foreground">Display your learning statistics publicly</p>
                  </div>
                  <Switch 
                    checked={privacy.showLearningProgress}
                    onCheckedChange={(checked) => handlePrivacyChange('showLearningProgress', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Achievements</Label>
                    <p className="text-sm text-muted-foreground">Display your badges and achievements</p>
                  </div>
                  <Switch 
                    checked={privacy.showAchievements}
                    onCheckedChange={(checked) => handlePrivacyChange('showAchievements', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Direct Messages</Label>
                    <p className="text-sm text-muted-foreground">Let other users send you direct messages</p>
                  </div>
                  <Switch 
                    checked={privacy.allowDirectMessages}
                    onCheckedChange={(checked) => handlePrivacyChange('allowDirectMessages', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Online Status</Label>
                    <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                  </div>
                  <Switch 
                    checked={privacy.showOnlineStatus}
                    onCheckedChange={(checked) => handlePrivacyChange('showOnlineStatus', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select 
                    value={appearance.theme} 
                    onValueChange={(value: any) => handleAppearanceChange('theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Use smaller spacing and components</p>
                  </div>
                  <Switch 
                    checked={appearance.compactMode}
                    onCheckedChange={(checked) => handleAppearanceChange('compactMode', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Animations</Label>
                    <p className="text-sm text-muted-foreground">Smooth transitions and effects</p>
                  </div>
                  <Switch 
                    checked={appearance.animationsEnabled}
                    onCheckedChange={(checked) => handleAppearanceChange('animationsEnabled', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={accountData.email}
                    onChange={(e) => setAccountData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username"
                    value={accountData.username}
                    onChange={(e) => setAccountData(prev => ({ ...prev, username: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input 
                    id="displayName"
                    value={accountData.displayName}
                    onChange={(e) => setAccountData(prev => ({ ...prev, displayName: e.target.value }))}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Change Password</Label>
                  <Button variant="outline">Update Password</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language & Region
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Display Language</Label>
                  <Select 
                    value={appearance.language} 
                    onValueChange={(value) => handleAppearanceChange('language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Time Zone</Label>
                  <Select defaultValue="pst">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                      <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                      <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                      <SelectItem value="cet">Central European Time (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Export Your Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Download a copy of all your data including posts, messages, and learning progress.
                  </p>
                  <Button variant="outline" onClick={handleExportData}>
                    Request Data Export
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-destructive">Delete Account</Label>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}