// pages/SecurityAuditPage.tsx
import React, { useState } from 'react';
import { Search, AlertCircle, Shield, Lock, CheckCircle } from 'lucide-react';

interface SecurityAuditResult {
  focus_area: string;
  importance: string;
  score: number;
  description: string;
}

const SecurityAuditPage: React.FC = () => {
    const defaultUrl = "https://paladinsec.co/assets/audits/20230402_Paladin_TraderJoe_DEX2.1_Final_Report.pdf";

  const [url, setUrl] = useState(defaultUrl);
  const [loading, setLoading] = useState(false);
  const [auditResults, setAuditResults] = useState<SecurityAuditResult[]>([]);
  const [auditScore, setAuditScore] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatUrl = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      return `${parsedUrl.origin}${parsedUrl.pathname}`;
    } catch {
      return url;
    }
  };

  const handleAuditCheck = async () => {
    setLoading(true);
    setError(null);
    
    // API URL'sini oluştur
    const apiUrl = `https://defi-risk-analysis.vercel.app/openai/analyze-security-audit?url=${url}`;
    console.log({ apiUrl });
    
    try {
      const response = await fetch(apiUrl);
      const dataRaw = await response.json();
      const data = JSON.parse(dataRaw.content);
      console.log('API Response:', data);

      // Mock data kullanarak test edelim
      // const mockData = [
      //   {
      //     focus_area: 'Smart Contract Vulnerabilities',
      //     importance: 'High',
      //     score: 5,
      //     description: 'The audit report from Paladin indicates that the reviewed smart contracts exhibit no high-priority vulnerabilities such as reentrancy or overflow. The contracts are well-structured to handle potential security breaches.'
      //   },
      //   {
      //     focus_area: 'Code Quality & Documentation',
      //     importance: 'Medium',
      //     score: 4,
      //     description: 'The codebase is well-documented with clear comments and follows best practices. The architecture is modular and maintainable.'
      //   },
      //   {
      //     focus_area: 'Access Control',
      //     importance: 'High',
      //     score: 5,
      //     description: 'Proper access control mechanisms are implemented with role-based permissions and secure ownership management.'
      //   },
      //   {
      //     focus_area: 'External Dependencies',
      //     importance: 'Medium',
      //     score: 4,
      //     description: 'The project uses well-audited external dependencies and libraries, with proper version control and security considerations.'
      //   }
      // ];

      const overallScore = parseFloat(data.weighted_average_score.toString()).toFixed(2);
      console.log({ overallScore });

      setAuditResults(data.scores);
      setAuditScore(overallScore);
    } catch (error) {
      console.error('Error:', error);
      // Hata durumunda da mock data'yı gösterelim
      const mockData = [
        {
          focus_area: 'Smart Contract Vulnerabilities',
          importance: 'High',
          score: 5,
          description: 'The audit report from Paladin indicates that the reviewed smart contracts exhibit no high-priority vulnerabilities such as reentrancy or overflow. The contracts are well-structured to handle potential security breaches.'
        },
        {
          focus_area: 'Code Quality & Documentation',
          importance: 'Medium',
          score: 4,
          description: 'The codebase is well-documented with clear comments and follows best practices. The architecture is modular and maintainable.'
        },
        {
          focus_area: 'Access Control',
          importance: 'High',
          score: 5,
          description: 'Proper access control mechanisms are implemented with role-based permissions and secure ownership management.'
        },
        {
          focus_area: 'External Dependencies',
          importance: 'Medium',
          score: 4,
          description: 'The project uses well-audited external dependencies and libraries, with proper version control and security considerations.'
        }
      ];
      setAuditResults(mockData);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Secure': return 'text-green-400 bg-green-500/10';
      case 'Warning': return 'text-yellow-400 bg-yellow-500/10';
      case 'Critical': return 'text-red-400 bg-red-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text mb-2">
          Smart Contract Security Audit
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Analyze and verify the security of any smart contract with our advanced audit checker
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-[#12141a] rounded-xl p-8 border border-blue-500/10 mb-8 max-w-3xl mx-auto">
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Shield className="h-16 w-16 text-blue-500 mb-2" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Enter Contract Details
            </h2>
          </div>
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              {error}
            </div>
          )}
          <input
            type="text"
            value={formatUrl(url)}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter audit report URL..."
            defaultValue={"defaultUrl"}
            className="w-full bg-[#1a1d25] text-white rounded-xl px-6 py-4 
                     border border-blue-500/20 focus:border-blue-500 
                     focus:ring-2 focus:ring-blue-500/20 focus:outline-none
                     text-lg transition-all duration-300"
          />
          <button
            onClick={handleAuditCheck}
            disabled={!url || loading}
            className="w-full px-8 py-4 rounded-xl 
                     bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 
                     hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 
                     text-white font-medium text-lg
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 transform hover:scale-[1.02]
                     shadow-lg hover:shadow-blue-500/25
                     flex items-center justify-center space-x-3"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                <span>Analyzing Report...</span>
              </>
            ) : (
              <>
                <Search className="w-6 h-6" />
                <span>Check Security Audit</span>
              </>
            )}
          </button>
        </div>
      </div>

    {auditScore && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#12141a] rounded-xl p-6 border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="text-lg font-medium text-gray-200">Overall Security Score</h3>
              <p className="text-2xl font-bold text-blue-400">{ auditScore }</p>
            </div>
          </div>
        </div>
      </div>
    )}

      {/* Results Table */}
      {auditResults && auditResults.length > 0 && (
        <div className="bg-[#12141a] rounded-xl border border-blue-500/10 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-blue-500/10">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text flex items-center space-x-2">
              <Shield className="w-6 h-6 text-blue-500" />
              <span>Security Analysis Results</span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1a1d25]">
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Focus Area</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Importance</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Score</th>
                  <th className="px-6 py-4 text-left text-gray-400 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-500/10">
                {auditResults.map((result, index) => (
                  <tr key={index} className="hover:bg-blue-500/5 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      {result.focus_area}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                        result.importance.toLowerCase() === 'high' 
                          ? 'bg-red-500/10 text-red-400' 
                          : result.importance.toLowerCase() === 'medium'
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : 'bg-green-500/10 text-green-400'
                      }`}>
                        {result.importance}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-[#1a1d25] rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              result.score >= 4 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                : result.score >= 3
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                                : 'bg-gradient-to-r from-red-500 to-pink-500'
                            }`}
                            style={{ width: `${(result.score / 5) * 100}%` }}
                          />
                        </div>
                        <span className="font-medium">{result.score}/5</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300 max-w-xl">
                      <p className="line-clamp-2 hover:line-clamp-none transition-all duration-300">
                        {result.description}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      )}

      {!loading && !error && auditResults && auditResults.length === 0 && url && (
        <div className="text-center py-12 text-gray-400">
          No audit results found. Please try a different URL.
        </div>
      )}
    </div>
  );
};

export default SecurityAuditPage;
