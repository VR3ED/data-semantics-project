import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ResultsAnalysis = () => {
  const [activeTab, setActiveTab] = useState('kshot');

  // K-shot learning progression data
  const kshotData = [
    { k: '0-Shot', bertPRONTO: 0.65, bertLMAOSI: 0.47, robertaPRONTO: 0.612, robertaLMAOSI: 0.516 },
    { k: '4-Shot', bertPRONTO: 0.698, bertLMAOSI: 0.641, robertaPRONTO: 0.645, robertaLMAOSI: 0.628 },
    { k: '32-Shot', bertPRONTO: 0.774, bertLMAOSI: 0.726, robertaPRONTO: 0.751, robertaLMAOSI: 0.755 },
    { k: '128-Shot', bertPRONTO: 0.847, bertLMAOSI: 0.826, robertaPRONTO: 0.825, robertaLMAOSI: 0.825 }
  ];

  // Verbalizer comparison data
  const verbalizerData = [
    { name: 'VF-PRONTO', bert: 0.809, roberta: 0.804 },
    { name: 'LIN-PRONTO', bert: 0.474, roberta: 0.555 },
    { name: 'WS-PRONTO', bert: 0.570, roberta: 0.518 },
    { name: 'MAV-PRONTO', bert: 0.812, roberta: 0.810 },
    { name: 'VF-LMAOSI', bert: 0.809, roberta: 0.757 },
    { name: 'LIN-LMAOSI', bert: 0.552, roberta: 0.536 },
    { name: 'WS-LMAOSI', bert: 0.480, roberta: 0.622 },
    { name: 'MAV-LMAOSI', bert: 0.797, roberta: 0.764 }
  ];

  // F1 Score comparison
  const f1Data = [
    { method: '128-Shot\nPRONTO', bertF1: 0.845, robertaF1: 0.820 },
    { method: 'MAV-\nPRONTO', bertF1: 0.818, robertaF1: 0.835 },
    { method: 'VF-\nPRONTO', bertF1: 0.811, robertaF1: 0.811 },
    { method: 'MAV-\nLMAOSI', bertF1: 0.818, robertaF1: 0.797 }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6 bg-gray-50">
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <h1 className="text-3xl font-bold text-gray-800">
            📊 Ontology Subsumption Inference - Results Analysis
          </h1>
          <p className="text-gray-600 mt-2">
            Comparing BERT and RoBERTa on PRONTO vs LMAOSI approaches
          </p>
        </CardHeader>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b-2 border-gray-200">
        <button
          onClick={() => setActiveTab('kshot')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'kshot'
              ? 'bg-blue-500 text-white border-b-4 border-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          K-Shot Learning Progression
        </button>
        <button
          onClick={() => setActiveTab('verbalizers')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'verbalizers'
              ? 'bg-blue-500 text-white border-b-4 border-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Verbalizer Comparison
        </button>
        <button
          onClick={() => setActiveTab('best')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'best'
              ? 'bg-blue-500 text-white border-b-4 border-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Top Performers (F1)
        </button>
      </div>

      {/* K-Shot Learning Tab */}
      {activeTab === 'kshot' && (
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">📈 K-Shot Learning Progression (Accuracy)</h2>
            <p className="text-gray-600">Performance improvement with increasing training examples</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={kshotData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="k" />
                <YAxis domain={[0.4, 0.9]} />
                <Tooltip 
                  formatter={(value) => (value * 100).toFixed(1) + '%'}
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="bertPRONTO" stroke="#3b82f6" strokeWidth={3} name="BERT + PRONTO" />
                <Line type="monotone" dataKey="bertLMAOSI" stroke="#60a5fa" strokeWidth={3} strokeDasharray="5 5" name="BERT + LMAOSI" />
                <Line type="monotone" dataKey="robertaPRONTO" stroke="#ef4444" strokeWidth={3} name="RoBERTa + PRONTO" />
                <Line type="monotone" dataKey="robertaLMAOSI" stroke="#f87171" strokeWidth={3} strokeDasharray="5 5" name="RoBERTa + LMAOSI" />
              </LineChart>
            </ResponsiveContainer>
            <Alert className="mt-4 bg-blue-50 border-blue-200">
              <AlertDescription>
                <strong>Key Insight:</strong> Both models show consistent improvement with more training examples. 
                BERT reaches <strong>84.7% accuracy</strong> at 128-shot with PRONTO prompt format, 
                demonstrating strong ontological reasoning capabilities.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Verbalizers Tab */}
      {activeTab === 'verbalizers' && (
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">🎯 Verbalizer Performance Comparison</h2>
            <p className="text-gray-600">PRONTO's automatic verbalizers vs traditional approaches</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={verbalizerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} />
                <YAxis domain={[0, 1]} />
                <Tooltip 
                  formatter={(value) => (value * 100).toFixed(1) + '%'}
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
                />
                <Legend />
                <Bar dataKey="bert" fill="#3b82f6" name="BERT" />
                <Bar dataKey="roberta" fill="#ef4444" name="RoBERTa" />
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription>
                  <strong>✓ Best Performers:</strong><br/>
                  • PRONTO-MAV: Non-linear verbalizer<br/>
                  • PRONTO-VF: Verbalizer-free baseline<br/>
                  Both achieve ~81% accuracy
                </AlertDescription>
              </Alert>
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertDescription>
                  <strong>⚠️ Underperformers:</strong><br/>
                  • PRONTO-LIN: Linear mapping struggles<br/>
                  • PRONTO-WS: Weighted softmax inconsistent<br/>
                  Shows importance of verbalizer design
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Best Performers Tab */}
      {activeTab === 'best' && (
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">🏆 Top Performing Methods (F1 Score)</h2>
            <p className="text-gray-600">Highest F1 scores across all approaches</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={f1Data} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0.75, 0.85]} />
                <YAxis dataKey="method" type="category" width={100} />
                <Tooltip 
                  formatter={(value) => (value * 100).toFixed(1) + '%'}
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
                />
                <Legend />
                <Bar dataKey="bertF1" fill="#3b82f6" name="BERT F1" />
                <Bar dataKey="robertaF1" fill="#ef4444" name="RoBERTa F1" />
              </BarChart>
            </ResponsiveContainer>
            <Alert className="mt-4 bg-purple-50 border-purple-200">
              <AlertDescription>
                <strong>🎓 Winner:</strong> BERT + 128-Shot PRONTO achieves the highest F1 score of <strong>84.5%</strong>, 
                closely followed by RoBERTa + MAV-PRONTO at <strong>83.5%</strong>. This demonstrates that both 
                k-shot learning and sophisticated verbalizers are effective strategies for ontology probing.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      {/* Conclusions Section */}
      <Card className="border-2 border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
          <h2 className="text-2xl font-bold text-gray-800">📝 Conclusions</h2>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p className="text-lg leading-relaxed mb-4">
            This study successfully demonstrates that <strong>masked language models (BERT and RoBERTa) 
            do encode ontological subsumption relations</strong>, validating the findings of both LMAOSI 
            and PRONTO papers. Our replication reveals several key insights:
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-2">🔍 Key Findings:</h3>
            <ul className="space-y-2">
              <li>
                <strong>K-Shot Learning Effectiveness:</strong> Performance improves dramatically from 
                0-shot (47-65% accuracy) to 128-shot (82.5-84.7%), confirming that ontological knowledge 
                can be effectively elicited through few-shot prompting.
              </li>
              <li>
                <strong>Verbalizer Impact:</strong> PRONTO-MAV (non-linear automatic verbalizer) and 
                PRONTO-VF (verbalizer-free) consistently outperform traditional linear mappings, achieving 
                ~81% accuracy. This suggests that complex, learned projections better capture ontological 
                semantics than hand-crafted verbalizers.
              </li>
              <li>
                <strong>Prompt Format Matters:</strong> The PRONTO prompt format ("&lt;C&gt; is a [MASK] of &lt;D&gt;") 
                generally yields better results than LMAOSI's interrogative format, particularly in 0-shot 
                settings (65% vs 47% for BERT).
              </li>
              <li>
                <strong>Model Comparison:</strong> BERT slightly outperforms RoBERTa in most configurations, 
                particularly with the PRONTO prompt, achieving a peak F1 of 84.5% (128-shot) compared to 
                RoBERTa's 83.5% (MAV-PRONTO).
              </li>
            </ul>
          </div>

          <p className="text-lg leading-relaxed">
            <strong>In conclusion</strong>, both traditional k-shot verbalizers (LMAOSI approach) and 
            automatic verbalizer learning (PRONTO approach) are viable strategies for ontology subsumption 
            inference. The optimal choice depends on available resources: <em>k-shot learning requires 
            labeled examples but achieves highest accuracy (84.7%)</em>, while <em>automatic verbalizers 
            like PRONTO-MAV offer a good trade-off with 81-83% accuracy without extensive fine-tuning</em>. 
            These results confirm that modern MLMs capture rich ontological structure, opening promising 
            avenues for knowledge base completion and semantic reasoning tasks.
          </p>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-8 pb-4">
        <p>Dataset: OntoLAMA (GO-ATOMIC-SI) | Models: bert-base-uncased, roberta-base</p>
        <p>Experiments replicated from LMAOSI (2023) and PRONTO (2024) papers</p>
      </div>
    </div>
  );
};

export default ResultsAnalysis;