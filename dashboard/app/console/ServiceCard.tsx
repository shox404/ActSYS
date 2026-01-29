import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function ServiceCard({ data }: { data: any }) {
    const router = useRouter();

    return (
        <Card className="shadow-none h-52 cursor-pointer" onClick={() => router.push(`/orgs/${data.$id}`)}>
            <CardContent>
                <div className="flex-1 w-full">
                    <h2 className="text-lg font-semibold">{data.name}</h2>
                </div>
            </CardContent>
        </Card>
    );
}
