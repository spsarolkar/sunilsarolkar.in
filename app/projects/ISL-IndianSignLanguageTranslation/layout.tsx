import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Indian Sign Language — Earlier web demo",
    description: "An earlier OpenPose-based experiment with Indian Sign Language, pose landmarks and sequence models.",
};
export default function DemoLayout({ children }: {
    children: React.ReactNode;
}) {
    return children;
}
