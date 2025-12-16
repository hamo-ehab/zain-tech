import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { Courses } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Courses[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Courses>>({
    courseName: '',
    courseDescription: '',
    price: 0,
    courseDuration: '',
    isPublished: false
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { items } = await BaseCrudService.getAll<Courses>('courses');
    setCourses(items);
    setLoading(false);
  };

  const handleCreate = async () => {
    const newCourse: Courses = {
      _id: crypto.randomUUID(),
      ...formData as Courses
    };
    await BaseCrudService.create('courses', newCourse);
    await loadCourses();
    setCreating(false);
    resetForm();
  };

  const handleUpdate = async (id: string) => {
    await BaseCrudService.update<Courses>('courses', {
      _id: id,
      ...formData
    });
    await loadCourses();
    setEditing(null);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      await BaseCrudService.delete('courses', id);
      await loadCourses();
    }
  };

  const startEdit = (course: Courses) => {
    setEditing(course._id);
    setFormData(course);
  };

  const resetForm = () => {
    setFormData({
      courseName: '',
      courseDescription: '',
      price: 0,
      courseDuration: '',
      isPublished: false
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
              Manage <span className="text-neon-cyan">Courses</span>
            </h1>
            <p className="font-paragraph text-lg text-white/70">
              Create, edit, and publish courses
            </p>
          </div>
          <Button
            onClick={() => setCreating(true)}
            className="bg-neon-green text-black hover:bg-neon-green/80"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Course
          </Button>
        </motion.div>

        {/* Create Form */}
        {creating && (
          <motion.div
            className="bg-black/50 border border-neon-green rounded-xl backdrop-blur-lg p-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-heading text-2xl font-bold text-white mb-6">Create New Course</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Course Name"
                value={formData.courseName}
                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                className="bg-black/50 border-neon-cyan/50 text-white"
              />
              <Input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="bg-black/50 border-neon-cyan/50 text-white"
              />
              <Input
                placeholder="Duration (e.g., 8 weeks)"
                value={formData.courseDuration}
                onChange={(e) => setFormData({ ...formData, courseDuration: e.target.value })}
                className="bg-black/50 border-neon-cyan/50 text-white"
              />
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-5 h-5"
                />
                <label htmlFor="published" className="font-paragraph text-sm text-white">
                  Published
                </label>
              </div>
            </div>
            <Textarea
              placeholder="Course Description"
              value={formData.courseDescription}
              onChange={(e) => setFormData({ ...formData, courseDescription: e.target.value })}
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

        {/* Courses List */}
        <div className="space-y-6">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              className="bg-black/50 border border-neon-cyan rounded-xl backdrop-blur-lg p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {editing === course._id ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      placeholder="Course Name"
                      value={formData.courseName}
                      onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                      className="bg-black/50 border-neon-cyan/50 text-white"
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      className="bg-black/50 border-neon-cyan/50 text-white"
                    />
                    <Input
                      placeholder="Duration"
                      value={formData.courseDuration}
                      onChange={(e) => setFormData({ ...formData, courseDuration: e.target.value })}
                      className="bg-black/50 border-neon-cyan/50 text-white"
                    />
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.isPublished}
                        onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                        className="w-5 h-5"
                      />
                      <label className="font-paragraph text-sm text-white">Published</label>
                    </div>
                  </div>
                  <Textarea
                    placeholder="Course Description"
                    value={formData.courseDescription}
                    onChange={(e) => setFormData({ ...formData, courseDescription: e.target.value })}
                    className="bg-black/50 border-neon-cyan/50 text-white mt-6"
                    rows={4}
                  />
                  <div className="flex gap-4 mt-6">
                    <Button onClick={() => handleUpdate(course._id)} className="bg-neon-green text-black hover:bg-neon-green/80">
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
                    <h3 className="font-heading text-2xl font-bold text-white mb-2">{course.courseName}</h3>
                    <p className="font-paragraph text-sm text-white/70 mb-3">{course.courseDescription}</p>
                    <div className="flex flex-wrap gap-4 font-paragraph text-sm text-white/60">
                      <span>Price: ${course.price}</span>
                      {course.courseDuration && <span>Duration: {course.courseDuration}</span>}
                      <span className={course.isPublished ? 'text-neon-green' : 'text-red-500'}>
                        {course.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => startEdit(course)} size="sm" variant="outline" className="border-neon-cyan text-neon-cyan">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button onClick={() => handleDelete(course._id)} size="sm" variant="outline" className="border-red-500 text-red-500">
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
