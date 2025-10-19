import { useState } from 'react';
import { Copy, RefreshCw, Shield, CheckCircle2, AlertCircle } from 'lucide-react';

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

type StrengthLevel = 'weak' | 'fair' | 'good' | 'strong' | 'excellent';

function App() {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let charset = '';
    let guaranteedChars = '';

    if (options.includeUppercase) {
      charset += uppercase;
      guaranteedChars += uppercase[Math.floor(Math.random() * uppercase.length)];
    }
    if (options.includeLowercase) {
      charset += lowercase;
      guaranteedChars += lowercase[Math.floor(Math.random() * lowercase.length)];
    }
    if (options.includeNumbers) {
      charset += numbers;
      guaranteedChars += numbers[Math.floor(Math.random() * numbers.length)];
    }
    if (options.includeSymbols) {
      charset += symbols;
      guaranteedChars += symbols[Math.floor(Math.random() * symbols.length)];
    }

    if (charset === '') {
      charset = lowercase;
      guaranteedChars = lowercase[Math.floor(Math.random() * lowercase.length)];
    }

    let result = guaranteedChars;
    const remainingLength = options.length - guaranteedChars.length;

    for (let i = 0; i < remainingLength; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    result = result.split('').sort(() => Math.random() - 0.5).join('');

    setPassword(result);
    setCopied(false);
  };

  const calculateStrength = (): { level: StrengthLevel; score: number; color: string; bgColor: string } => {
    if (!password) return { level: 'weak', score: 0, color: 'text-slate-400', bgColor: 'bg-slate-200' };

    let score = 0;

    if (password.length >= 12) score += 20;
    if (password.length >= 16) score += 15;
    if (password.length >= 20) score += 10;

    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^a-zA-Z0-9]/.test(password)) score += 20;

    const uniqueChars = new Set(password).size;
    score += Math.min(uniqueChars, 10);

    if (score < 30) return { level: 'weak', score, color: 'text-red-600', bgColor: 'bg-red-600' };
    if (score < 50) return { level: 'fair', score, color: 'text-orange-600', bgColor: 'bg-orange-600' };
    if (score < 70) return { level: 'good', score, color: 'text-yellow-600', bgColor: 'bg-yellow-600' };
    if (score < 85) return { level: 'strong', score, color: 'text-green-600', bgColor: 'bg-green-600' };
    return { level: 'excellent', score, color: 'text-emerald-600', bgColor: 'bg-emerald-600' };
  };

  const copyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const strength = calculateStrength();
  const activeOptionsCount = [
    options.includeUppercase,
    options.includeLowercase,
    options.includeNumbers,
    options.includeSymbols,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Password Generator</h1>
            <p className="text-slate-600 text-lg">Create secure, random passwords instantly</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Password Length: {options.length}
              </label>
              <input
                type="range"
                min="8"
                max="64"
                value={options.length}
                onChange={(e) => setOptions({ ...options, length: Number(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>8</span>
                <span>64</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Include Characters</h3>

              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    options.includeUppercase ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                  }`}>
                    {options.includeUppercase && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <span className="font-medium text-slate-700">Uppercase Letters (A-Z)</span>
                </div>
                <input
                  type="checkbox"
                  checked={options.includeUppercase}
                  onChange={(e) => setOptions({ ...options, includeUppercase: e.target.checked })}
                  className="hidden"
                  disabled={activeOptionsCount === 1 && options.includeUppercase}
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    options.includeLowercase ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                  }`}>
                    {options.includeLowercase && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <span className="font-medium text-slate-700">Lowercase Letters (a-z)</span>
                </div>
                <input
                  type="checkbox"
                  checked={options.includeLowercase}
                  onChange={(e) => setOptions({ ...options, includeLowercase: e.target.checked })}
                  className="hidden"
                  disabled={activeOptionsCount === 1 && options.includeLowercase}
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    options.includeNumbers ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                  }`}>
                    {options.includeNumbers && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <span className="font-medium text-slate-700">Numbers (0-9)</span>
                </div>
                <input
                  type="checkbox"
                  checked={options.includeNumbers}
                  onChange={(e) => setOptions({ ...options, includeNumbers: e.target.checked })}
                  className="hidden"
                  disabled={activeOptionsCount === 1 && options.includeNumbers}
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    options.includeSymbols ? 'bg-blue-600 border-blue-600' : 'border-slate-300'
                  }`}>
                    {options.includeSymbols && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <span className="font-medium text-slate-700">Symbols (!@#$%^&*)</span>
                </div>
                <input
                  type="checkbox"
                  checked={options.includeSymbols}
                  onChange={(e) => setOptions({ ...options, includeSymbols: e.target.checked })}
                  className="hidden"
                  disabled={activeOptionsCount === 1 && options.includeSymbols}
                />
              </label>
            </div>

            <button
              onClick={generatePassword}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="w-5 h-5" />
              Generate Password
            </button>
          </div>

          {password && (
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Your Password</h2>
                <div className="flex items-center gap-2">
                  <AlertCircle className={`w-4 h-4 ${strength.color}`} />
                  <span className={`text-sm font-semibold ${strength.color} capitalize`}>
                    {strength.level}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${strength.bgColor}`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
              </div>

              <div className="relative mb-4">
                <div className="bg-slate-900 text-slate-100 p-6 rounded-xl font-mono text-lg break-all select-all">
                  {password}
                </div>
              </div>

              <button
                onClick={copyToClipboard}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Copy className="w-5 h-5" />
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security Tips
                </h3>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Use a unique password for each account</li>
                  <li>• Enable two-factor authentication when available</li>
                  <li>• Store passwords in a secure password manager</li>
                  <li>• Never share your passwords with anyone</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
