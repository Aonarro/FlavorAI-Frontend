import RegisterForm from "@/components/molecules/RegisterForm";

export function RegisterTemplate() {
    return (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4 text-center">Login into your account</h1>
            <RegisterForm />
        </div>
    );
}