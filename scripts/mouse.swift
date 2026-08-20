// Synthetic mouse input for driving the runIde sandbox during doc captures.
// System Events' `click at` works, but it has no press/drag/release, which
// splitters and drag handles need. CGEvent gives all three.
//
//   mouse click  X Y
//   mouse move   X Y
//   mouse drag   X1 Y1 X2 Y2      (press, glide, release)
//   mouse dblclick X Y
//   mouse scroll X Y LINES     (negative = down)
//   mouse rclick X Y
// Coordinates are global screen points, origin top-left.
import CoreGraphics
import Foundation

func post(_ type: CGEventType, _ p: CGPoint, _ button: CGMouseButton = .left) {
    CGEvent(mouseEventSource: nil, mouseType: type, mouseCursorPosition: p, mouseButton: button)?
        .post(tap: .cghidEventTap)
}
func sleepMs(_ ms: UInt32) { usleep(ms * 1000) }

let a = CommandLine.arguments
guard a.count >= 2 else { FileHandle.standardError.write("usage: mouse click|move|drag ...\n".data(using: .utf8)!); exit(2) }

switch a[1] {
case "move" where a.count == 4:
    post(.mouseMoved, CGPoint(x: Double(a[2])!, y: Double(a[3])!))
case "click" where a.count == 4:
    let p = CGPoint(x: Double(a[2])!, y: Double(a[3])!)
    post(.mouseMoved, p); sleepMs(60)
    post(.leftMouseDown, p); sleepMs(60)
    post(.leftMouseUp, p)
case "dblclick" where a.count == 4:
    let p = CGPoint(x: Double(a[2])!, y: Double(a[3])!)
    post(.mouseMoved, p); sleepMs(60)
    // A double click is two down/up pairs carrying an increasing click count.
    for count in 1...2 {
        for type in [CGEventType.leftMouseDown, .leftMouseUp] {
            if let e = CGEvent(mouseEventSource: nil, mouseType: type,
                               mouseCursorPosition: p, mouseButton: .left) {
                e.setIntegerValueField(.mouseEventClickState, value: Int64(count))
                e.post(tap: .cghidEventTap)
            }
            sleepMs(30)
        }
    }

case "rclick" where a.count == 4:
    let p = CGPoint(x: Double(a[2])!, y: Double(a[3])!)
    post(.mouseMoved, p); sleepMs(60)
    post(.rightMouseDown, p, .right); sleepMs(60)
    post(.rightMouseUp, p, .right)

case "scroll" where a.count == 5:
    let p = CGPoint(x: Double(a[2])!, y: Double(a[3])!)
    let lines = Int32(a[4]) ?? -3
    post(.mouseMoved, p); sleepMs(80)
    // one wheel event per line, so Swing's smooth scrolling keeps up
    let step: Int32 = lines < 0 ? -1 : 1
    for _ in 0..<abs(lines) {
        if let e = CGEvent(scrollWheelEvent2Source: nil, units: .line,
                           wheelCount: 1, wheel1: step, wheel2: 0, wheel3: 0) {
            e.location = p
            e.post(tap: .cghidEventTap)
        }
        sleepMs(25)
    }

case "drag" where a.count == 6:
    let from = CGPoint(x: Double(a[2])!, y: Double(a[3])!)
    let to   = CGPoint(x: Double(a[4])!, y: Double(a[5])!)
    post(.mouseMoved, from); sleepMs(120)
    post(.leftMouseDown, from); sleepMs(150)
    // glide in steps so Swing's drag handling keeps up
    let steps = 24
    for i in 1...steps {
        let t = Double(i) / Double(steps)
        post(.leftMouseDragged, CGPoint(x: from.x + (to.x - from.x) * t,
                                        y: from.y + (to.y - from.y) * t))
        sleepMs(16)
    }
    sleepMs(120)
    post(.leftMouseUp, to)
default:
    FileHandle.standardError.write("bad arguments\n".data(using: .utf8)!); exit(2)
}
