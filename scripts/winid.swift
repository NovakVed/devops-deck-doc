// Prints on-screen windows of the runIde sandbox as: id <TAB> WxH <TAB> title
// The sandbox app is named "Main"; the user's own IDE is "IntelliJ IDEA", so the
// two never collide. Needs Screen Recording permission (same as screencapture).
import CoreGraphics
import Foundation

let owner = CommandLine.arguments.count > 1 ? CommandLine.arguments[1] : "Main"
guard let list = CGWindowListCopyWindowInfo([.optionOnScreenOnly, .excludeDesktopElements],
                                            kCGNullWindowID) as? [[String: Any]] else { exit(1) }
for w in list {
    guard ((w[kCGWindowOwnerName as String] as? String) ?? "") == owner else { continue }
    // Layer 0 is a real frame; menus, popups and tooltips live on higher layers
    // and MUST be listed too - they are what most dialog/menu shots capture.
    let layer = (w[kCGWindowLayer as String] as? Int) ?? 0
    let id = (w[kCGWindowNumber as String] as? Int) ?? -1
    let title = (w[kCGWindowName as String] as? String) ?? ""
    var dims = ""
    if let b = w[kCGWindowBounds as String] as? [String: Any] {
        dims = "\(Int((b["Width"] as? Double) ?? 0))x\(Int((b["Height"] as? Double) ?? 0))"
    }
    print("\(id)\t\(dims)\t\(layer)\t\(title)")
}
