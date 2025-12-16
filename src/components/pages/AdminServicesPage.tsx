import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Services>>({
    serviceName: '',
    description: '',
    shortDescription: '',
    price: 0,
    isAvailable: true
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { items } = await BaseCrudService.getAll<Services>('services');
    setServices(items);
    setLoading(false);
  };

  const handleCreate = async () => {
    const newService: Services = {
      _id: crypto.randomUUID(),
      ...formData as Services
    };
    await BaseCrudService.create('services', newService);
    await loadServices();
    setCreating(false);
    resetForm();
  };

  const handleUpdate = async (id: string) => {
    await BaseCrudService.update<Services>('services', {
      _id: id,
      ...formData
    });
    await loadServices();
    setEditing(null);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await BaseCrudService.delete('services', id);
      await loadServices();
    }
  };

  const startEdit = (service: Services) => {
    setEditing(service._id);
    setFormData(service);
  };

  const resetForm = () => {
    setFormData({
      serviceName: '',
      description: '',
      shortDescription: '',
      price: 0,
      isAvailable: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16">
      <div className="max-w-[100rem] mx-auto px-4">
        <motion.div
          className="mb-12 flex items-center justify-between"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-4">
              Manage <span className="text-neon-cyan">Services</span>
            </h1>
            <p className="font-paragraph text-lg text-white/70">
              Add and update service offerings
            </p>
          </div>
          <Button
            onClick={() => setCreating(true)}
            className="bg-neon-green text-black hover:bg-neon-green/80"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Service
          </Button>
        </motion.div>

        {/* Create Form */}
        {creating && (
          <motion.div
            className="bg-black/50 border border-neon-green rounded-xl backdrop-blur-lg p-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-heading text-2xl font-bold text-white mb-6">Create New Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Service Name"
                value={formData.serviceName}
                onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                className="bg-black/50 border-neon-cyan/50 text-white"
              />
              <Input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="bg-black/50 border-neon-cyan/50 text-white"
              />
              <div className="md:col-span-2">
                <Input
                  placeholder="Short Description"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="bg-black/50 border-neon-cyan/50 text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="w-5 h-5"
                />
                <label htmlFor="available" className="font-paragraph text-sm text-white">
                  Available
                </label>
              </div>
            </div>
            <Textarea
              placeholder="Full Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-black/50 border-neon-cyan/50 text-white mt-6"
              rows={4}
            />
            <div className="flex gap-4 mt-6">
              <Button onClick={handleCreate} className="bg-neon-green text-black hover:bg-neon-green/80">
                <Save className="w-5 h-5 mr-2" />
                Create
              </Button>
              <Button onClick={() => { setCreating(false); resetForm(); }} variant="outline" className="border-neon-cyan text-neon-cyan">
                <X className="w-5 h-5 mr-2" />
                Cancel
              </Button>
            </div>
          </motion.div>
        )}

        {/* Services List */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              className="bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {editing === service._id ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      placeholder="Service Name"
                      value={formData.serviceName}
                      onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                      className="bg-black/50 border-neon-cyan/50 text-white"
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      className="bg-black/50 border-neon-cyan/50 text-white"
                    />
                    <div className="md:col-span-2">
                      <Input
                        placeholder="Short Description"
                        value={formData.shortDescription}
                        onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                        className="bg-black/50 border-neon-cyan/50 text-white"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.isAvailable}
                        onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                        className="w-5 h-5"
                      />
                      <label className="font-paragraph text-sm text-white">Available</label>
                    </div>
                  </div>
                  <Textarea
                    placeholder="Full Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-black/50 border-neon-cyan/50 text-white mt-6"
                    rows={4}
                  />
                  <div className="flex gap-4 mt-6">
                    <Button onClick={() => handleUpdate(service._id)} className="bg-neon-green text-black hover:bg-neon-green/80">
                      <Save className="w-5 h-5 mr-2" />
                      Save
                    </Button>
                    <Button onClick={() => { setEditing(null); resetForm(); }} variant="outline" className="border-neon-cyan text-neon-cyan">
                      <X className="w-5 h-5 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">{service.serviceName}</h3>
                    {service.shortDescription && (
                      <p className="font-paragraph text-sm text-white/80 mb-2">{service.shortDescription}</p>
                    )}
                    <p className="font-paragraph text-sm text-white/70 mb-3">{service.description}</p>
                    <div className="flex flex-wrap gap-4 font-paragraph text-sm text-white/60">
                      <span>Price: ${service.price}</span>
                      <span className={service.isAvailable ? 'text-neon-green' : 'text-red-500'}>
                        {service.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => startEdit(service)} size="sm" variant="outline" className="border-neon-cyan text-neon-cyan">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => handleDelete(service._id)} size="sm" variant="outline" className="border-red-500 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
