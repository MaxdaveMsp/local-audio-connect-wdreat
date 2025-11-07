
# Screenshot Generation Guide for StreamConnect

This guide will help you create the required App Store screenshots for StreamConnect.

## Required Screenshot Sizes

### iPhone Screenshots (Required)
1. **6.7" Display** (iPhone 15 Pro Max, 14 Pro Max, 13 Pro Max, 12 Pro Max)
   - Size: 1290 x 2796 pixels
   - Format: PNG or JPEG

2. **6.5" Display** (iPhone 11 Pro Max, XS Max)
   - Size: 1242 x 2688 pixels
   - Format: PNG or JPEG

3. **5.5" Display** (iPhone 8 Plus, 7 Plus, 6s Plus)
   - Size: 1242 x 2208 pixels
   - Format: PNG or JPEG

### iPad Screenshots (Optional but Recommended)
1. **12.9" Display** (iPad Pro 12.9")
   - Size: 2048 x 2732 pixels
   - Format: PNG or JPEG

## How to Generate Screenshots

### Method 1: Using iOS Simulator (Recommended)

1. **Install Xcode** (Mac required)
   ```bash
   # Install Xcode from Mac App Store
   ```

2. **Run the app in simulator**
   ```bash
   npm run ios
   # or
   expo start --ios
   ```

3. **Select the correct simulator**
   - iPhone 15 Pro Max (for 6.7" screenshots)
   - iPhone 11 Pro Max (for 6.5" screenshots)
   - iPhone 8 Plus (for 5.5" screenshots)

4. **Take screenshots**
   - Navigate to each screen
   - Press `Cmd + S` to save screenshot
   - Screenshots saved to Desktop

5. **Verify dimensions**
   - Open in Preview or image editor
   - Confirm exact pixel dimensions

### Method 2: Using Real Device

1. **Install app on device via TestFlight or development build**

2. **Take screenshots**
   - iPhone with Face ID: Press Side Button + Volume Up
   - iPhone with Home Button: Press Home Button + Side Button

3. **Transfer to computer**
   - AirDrop, iCloud Photos, or cable transfer

4. **Resize if needed**
   - Use image editing software to match exact dimensions

### Method 3: Using Screenshot Tools

**Recommended Tools:**
- **Figma** (Free) - Design mockups
- **Sketch** (Mac) - Design mockups
- **Adobe XD** (Free) - Design mockups
- **Screenshot Creator** - Online tools

## Screenshot Content Guide

### Screenshot 1: Home Screen - Connection Interface

**Setup:**
1. Navigate to home screen
2. Fill in example data:
   - IP Address: "192.168.1.100"
   - Port: "8080"
3. Ensure good lighting/contrast
4. Clean status bar (full battery, good signal)

**Overlay Text (Optional):**
- Title: "Connect Instantly"
- Subtitle: "Enter IP and port or scan QR code"

### Screenshot 2: QR Code Scanner

**Setup:**
1. Navigate to QR scanner screen
2. Point camera at a QR code (or use mock QR code)
3. Capture with scanning frame visible
4. Show scanning animation if possible

**Overlay Text (Optional):**
- Title: "Scan & Connect"
- Subtitle: "Instant setup with QR codes"

### Screenshot 3: Active Stream Connection

**Setup:**
1. Connect to a test stream
2. Show WebView with audio player visible
3. Ensure bookmark icon is visible
4. Show active/playing state

**Overlay Text (Optional):**
- Title: "Stream & Listen"
- Subtitle: "High-quality audio streaming"

### Screenshot 4: Saved Streams Library

**Setup:**
1. Navigate to Saved Streams tab
2. Ensure 3-5 saved streams are visible
3. Show variety of stream names
4. Display clean, organized layout

**Example Saved Streams:**
- "Living Room Audio"
- "Kitchen Radio"
- "Garage Speakers"
- "Bedroom Stream"
- "Office Audio"

**Overlay Text (Optional):**
- Title: "Quick Access Library"
- Subtitle: "Save and organize your streams"

### Screenshot 5: Background Playback Feature

**Setup:**
1. Create a mockup showing:
   - Phone with locked screen
   - Audio controls on lock screen
   - StreamConnect branding
2. Or show notification with playback controls

**Overlay Text (Required):**
- Title: "Listen Anywhere"
- Subtitle: "Continues playing with screen locked"

## Adding Text Overlays

### Option 1: Design Tool (Recommended)

Use Figma, Sketch, or Adobe XD:

1. Import screenshot
2. Add text layers with:
   - **Title Font:** SF Pro Display Bold, 48-60pt
   - **Subtitle Font:** SF Pro Text Regular, 28-36pt
   - **Colors:** White text with subtle shadow for readability

3. Position text:
   - Top third of screen for titles
   - Avoid covering important UI elements

### Option 2: Online Tools

- **Canva** - Easy drag-and-drop
- **Placeit** - App screenshot templates
- **Smartmockups** - Device mockups with screenshots

### Option 3: No Overlays

Apple allows screenshots without text overlays. The app UI should be self-explanatory.

## Design Guidelines

### Status Bar
- **Time:** 9:41 AM (Apple's standard)
- **Battery:** Full or near-full
- **Signal:** Full bars
- **WiFi:** Connected

### Content
- Use realistic but generic data
- No personal information
- No copyrighted content
- Professional appearance

### Colors
- Ensure good contrast
- Test in both light and dark mode
- Consistent color scheme across screenshots

### Composition
- Show key features clearly
- Avoid clutter
- Highlight unique selling points
- Tell a story (connection flow)

## Screenshot Order

Arrange screenshots to tell a story:

1. **Home Screen** - First impression, main feature
2. **QR Scanner** - Unique feature, ease of use
3. **Active Stream** - Core functionality
4. **Saved Streams** - Organization, convenience
5. **Background Playback** - Key benefit

## Quality Checklist

Before submitting, verify:

- [ ] Exact pixel dimensions match requirements
- [ ] File format is PNG or JPEG
- [ ] File size under 500KB per screenshot
- [ ] No personal information visible
- [ ] Status bar looks clean
- [ ] Text is readable (if using overlays)
- [ ] Colors are vibrant and accurate
- [ ] No UI glitches or errors visible
- [ ] Consistent style across all screenshots
- [ ] Screenshots show app in best light

## Localization

If submitting in multiple languages:

1. Take screenshots with app in each language
2. Translate overlay text
3. Maintain same composition/layout
4. Test text fits within design

## Tools and Resources

### Screenshot Dimensions Reference
- [Apple's Screenshot Specifications](https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications)

### Design Tools
- **Figma** - https://figma.com (Free)
- **Sketch** - https://sketch.com (Mac, Paid)
- **Adobe XD** - https://adobe.com/products/xd (Free)

### Mockup Generators
- **Smartmockups** - https://smartmockups.com
- **Placeit** - https://placeit.net
- **Mockuphone** - https://mockuphone.com (Free)

### Screenshot Optimization
- **TinyPNG** - Compress images
- **ImageOptim** - Mac app for optimization

## Testing Screenshots

Before final submission:

1. **Preview in App Store Connect**
   - Upload to App Store Connect
   - View in preview mode
   - Check on different device sizes

2. **Get Feedback**
   - Show to colleagues/friends
   - Ask: "What does this app do?"
   - Iterate based on feedback

3. **A/B Testing** (Post-Launch)
   - Try different screenshot orders
   - Test with/without text overlays
   - Monitor conversion rates

## Common Mistakes to Avoid

- ❌ Wrong dimensions
- ❌ Low resolution/blurry images
- ❌ Personal information visible
- ❌ Inconsistent status bar
- ❌ Too much text overlay
- ❌ Poor contrast/readability
- ❌ Showing errors or bugs
- ❌ Outdated UI in screenshots
- ❌ Misleading features
- ❌ Copyright violations

## Final Tips

1. **Quality over quantity** - 5 great screenshots better than 10 mediocre ones
2. **First impression matters** - First screenshot is most important
3. **Show, don't tell** - Let the UI speak for itself
4. **Keep it fresh** - Update screenshots with major updates
5. **Test on device** - View how they look in App Store on actual device

---

**Need Help?**

If you need assistance creating screenshots:
1. Use the iOS Simulator method (easiest)
2. Hire a designer on Fiverr or Upwork
3. Use screenshot template services
4. Contact Apple Developer Support

Good luck with your App Store submission!
