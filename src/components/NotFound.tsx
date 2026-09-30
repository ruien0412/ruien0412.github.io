import { useEffect, useState } from 'react';
import MotionWrapper from '../components/MotionWrapper';

export default function NotFound() {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            window.location.href = '/';
        }
    }, [countdown]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center px-6">
            <MotionWrapper
                className="text-center max-w-2xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* 404 號碼 */}
                <div className="mb-8">
                    <h1 className="text-8xl md:text-9xl font-bold text-gray-900 dark:text-white">
                        404
                    </h1>
                </div>

                {/* 標題和描述 */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        頁面不存在
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        抱歉，您訪問的頁面不存在或已被移除。
                    </p>
                </div>

                {/* 倒計時卡片 */}
                <MotionWrapper
                    className="mb-12 bg-gray-50 dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        自動跳轉中...
                    </p>
                    <div className="text-5xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                        {countdown}s
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        將在 {countdown} 秒後返回首頁
                    </p>

                    {/* 進度條 */}
                    <div className="mt-6 w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1 overflow-hidden">
                        <MotionWrapper
                            className="bg-blue-600 dark:bg-blue-400 h-full"
                            initial={{ width: '100%' }}
                            animate={{ width: '0%' }}
                            transition={{ duration: 5, ease: 'linear' }}
                        />
                    </div>
                </MotionWrapper>

                {/* 按鈕 */}
                <MotionWrapper
                    className="space-y-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <a
                        href="/"
                        className="block w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        立即返回首頁
                    </a>

                    {/* 導航連結 */}
                    <div className="pt-4 text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <p>或者您可以瀏覽：</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="/projects"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                            >
                                查看專案
                            </a>
                            <span className="text-gray-400">•</span>
                            <a
                                href="/about"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                            >
                                關於我
                            </a>
                            <span className="text-gray-400">•</span>
                            <a
                                href="/skills"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                            >
                                技能
                            </a>
                            <span className="text-gray-400">•</span>
                            <a  
                                href="/contact"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                            >
                                聯絡我
                            </a>
                        </div>
                    </div>
                </MotionWrapper>
            </MotionWrapper>
        </div>
    );
}
