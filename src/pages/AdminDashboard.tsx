import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { dataService } from '../services/dataService';
import { 
  Booking, 
  Vehicle, 
  BookingStatus, 
  PaymentStatus, 
  CustomerEnquiry, 
  CustomerReview, 
  GalleryItem,
  VehicleCategory,
  GroupQuotation,
  RouteTariff 
} from '../types';
import { 
  ShieldCheck, 
  Car, 
  Calendar, 
  DollarSign, 
  Users, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  Download, 
  Printer, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  Database, 
  Copy, 
  MessageSquare, 
  LogOut, 
  Lock, 
  CreditCard 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    isAdmin, 
    adminLogin, 
    adminLogout, 
    openVoucherModal, 
    openMpesaModal 
  } = useApp();

  // Admin Auth Form State
  const [emailInput, setEmailInput] = useState('admin@m07.co.ke');
  const [passInput, setPassInput] = useState('M07Admin2026!');
  const [loginError, setLoginError] = useState(false);

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'bookings' | 'quotations' | 'fleet' | 'pricing' | 'enquiries' | 'reviews' | 'payments' | 'database' | 'golive'
  >('overview');

  // Reactive Data
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotations, setQuotations] = useState<GroupQuotation[]>([]);
  const [routeTariffs, setRouteTariffs] = useState<RouteTariff[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [mpesaLogs, setMpesaLogs] = useState<any[]>([]);

  // Route Tariff Inline Editing State
  const [editingTariffId, setEditingTariffId] = useState<string | null>(null);
  const [tariffPriceInput, setTariffPriceInput] = useState<number>(0);
  const [tariffNotesInput, setTariffNotesInput] = useState<string>('');

  // Filters
  const [bookingSearch, setBookingSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modal State for Adding/Editing Vehicle
  const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [vehFormData, setVehFormData] = useState({
    name: '',
    category: 'Small cars' as VehicleCategory,
    modelYear: 2022,
    transmission: 'Automatic' as 'Automatic' | 'Manual',
    fuelType: 'Petrol' as 'Petrol' | 'Diesel' | 'Hybrid',
    seats: 5,
    luggageCapacity: 3,
    pricePerDay: 3500,
    pricePerDayWeekly: 3200,
    chauffeurDailyRate: 2000,
    image: '',
    description: '',
    featuresText: 'Air Conditioning, Bluetooth Audio, Push Start',
    isAvailable: true,
    minimumDays: 1
  });

  const [copiedSql, setCopiedSql] = useState(false);

  const refreshData = () => {
    setBookings(dataService.getBookings());
    setQuotations(dataService.getGroupQuotations());
    setRouteTariffs(dataService.getRouteTariffs());
    setVehicles(dataService.getVehicles());
    setEnquiries(dataService.getEnquiries());
    setReviews(dataService.getReviews());
    setMpesaLogs(dataService.getMpesaTransactions());
  };

  useEffect(() => {
    refreshData();
  }, [isAdmin]);

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(emailInput, passInput);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-16 p-6 sm:p-8 bg-[#0F141D] border border-[#D4AF37]/30 rounded-2xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mx-auto text-[#D4AF37]">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white font-display">Staff & Admin Portal</h2>
          <p className="text-xs text-neutral-400">
            Secure role-based access for M07 dispatchers and management.
          </p>
        </div>

        {loginError && (
          <div className="p-3 bg-red-950/70 border border-red-700 rounded-lg text-xs text-red-200">
            Invalid credentials. Use official admin demo account.
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-neutral-300 font-medium mb-1">Staff Email</label>
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-neutral-300 font-medium mb-1">Secret Access Key</label>
            <input
              type="password"
              required
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              className="w-full p-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-bold text-xs rounded-lg hover:brightness-110 transition-all cursor-pointer shadow"
          >
            Authenticate & Open Console
          </button>

          <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 space-y-1">
            <p className="font-semibold text-neutral-300">Authorized Demo Credentials:</p>
            <p>Email: <code className="text-[#D4AF37]">admin@m07.co.ke</code></p>
            <p>Password: <code className="text-[#D4AF37]">M07Admin2026!</code></p>
            <button
              type="button"
              onClick={() => {
                setEmailInput('admin@m07.co.ke');
                setPassInput('M07Admin2026!');
              }}
              className="text-[10px] text-[#D4AF37] underline pt-1 cursor-pointer"
            >
              Click to autofill demo credentials
            </button>
          </div>
        </form>
      </div>
    );
  }

  // --- STATS COMPUTATION ---
  const totalBookingsCount = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
  const inProgressCount = bookings.filter(b => b.status === 'In progress').length;
  const completedCount = bookings.filter(b => b.status === 'Completed').length;
  const totalRevenueKsh = bookings
    .filter(b => b.status !== 'Cancelled' && b.status !== 'Rejected')
    .reduce((acc, b) => acc + (b.totalCostKsh || 0), 0);
  const paidRevenueKsh = bookings
    .filter(b => b.paymentStatus.startsWith('Paid'))
    .reduce((acc, b) => acc + (b.totalCostKsh || 0), 0);

  // --- BOOKING STATUS ACTIONS ---
  const handleUpdateStatus = (id: string, status: BookingStatus) => {
    dataService.updateBookingStatus(id, status);
    refreshData();
  };

  const handleUpdatePayment = (id: string, payStatus: PaymentStatus) => {
    dataService.updatePaymentStatus(id, payStatus);
    refreshData();
  };

  const handleExportCSV = () => {
    const csv = dataService.exportBookingsToCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `M07_Bookings_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- FLEET MODAL HANDLERS ---
  const handleOpenAddVehicle = () => {
    setEditingVehicle(null);
    setVehFormData({
      name: '',
      category: 'Small cars',
      modelYear: 2023,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      seats: 5,
      luggageCapacity: 3,
      pricePerDay: 3500,
      pricePerDayWeekly: 3200,
      chauffeurDailyRate: 2000,
      image: '/images/hero_m07_fleet_1793873968288.jpg',
      description: 'Fleet unit in excellent mechanical condition, serviced for coastal tours.',
      featuresText: 'Air Conditioning, Bluetooth Audio, Push Start',
      isAvailable: true,
      minimumDays: 1
    });
    setVehicleModalOpen(true);
  };

  const handleOpenEditVehicle = (veh: Vehicle) => {
    setEditingVehicle(veh);
    setVehFormData({
      name: veh.name,
      category: veh.category,
      modelYear: veh.modelYear,
      transmission: veh.transmission,
      fuelType: veh.fuelType,
      seats: veh.seats,
      luggageCapacity: veh.luggageCapacity,
      pricePerDay: veh.pricePerDay,
      pricePerDayWeekly: veh.pricePerDayWeekly || veh.pricePerDay,
      chauffeurDailyRate: veh.chauffeurDailyRate,
      image: veh.image,
      description: veh.description,
      featuresText: veh.features.join(', '),
      isAvailable: veh.isAvailable,
      minimumDays: veh.minimumDays
    });
    setVehicleModalOpen(true);
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const features = vehFormData.featuresText.split(',').map(f => f.trim()).filter(Boolean);

    if (editingVehicle) {
      dataService.updateVehicle(editingVehicle.id, {
        name: vehFormData.name,
        category: vehFormData.category,
        modelYear: Number(vehFormData.modelYear),
        transmission: vehFormData.transmission,
        fuelType: vehFormData.fuelType,
        seats: Number(vehFormData.seats),
        luggageCapacity: Number(vehFormData.luggageCapacity),
        pricePerDay: Number(vehFormData.pricePerDay),
        pricePerDayWeekly: Number(vehFormData.pricePerDayWeekly),
        chauffeurDailyRate: Number(vehFormData.chauffeurDailyRate),
        image: vehFormData.image,
        description: vehFormData.description,
        features,
        isAvailable: vehFormData.isAvailable,
        minimumDays: Number(vehFormData.minimumDays)
      });
    } else {
      dataService.addVehicle({
        name: vehFormData.name,
        category: vehFormData.category,
        modelYear: Number(vehFormData.modelYear),
        transmission: vehFormData.transmission,
        fuelType: vehFormData.fuelType,
        seats: Number(vehFormData.seats),
        luggageCapacity: Number(vehFormData.luggageCapacity),
        pricePerDay: Number(vehFormData.pricePerDay),
        pricePerDayWeekly: Number(vehFormData.pricePerDayWeekly),
        chauffeurDailyRate: Number(vehFormData.chauffeurDailyRate),
        image: vehFormData.image,
        description: vehFormData.description,
        features,
        isAvailable: vehFormData.isAvailable,
        minimumDays: Number(vehFormData.minimumDays)
      });
    }

    setVehicleModalOpen(false);
    refreshData();
  };

  const handleDeleteVehicle = (id: string) => {
    if (confirm('Are you sure you want to remove this vehicle from the active fleet?')) {
      dataService.deleteVehicle(id);
      refreshData();
    }
  };

  const handleToggleAvail = (id: string) => {
    dataService.toggleVehicleAvailability(id);
    refreshData();
  };

  // Filter Bookings List
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.reference.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                          b.customerName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                          b.customerPhone.includes(bookingSearch) ||
                          b.vehicleName.toLowerCase().includes(bookingSearch.toLowerCase());
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner & Tab Navigation */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              M07 Central Operations Command
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-0.5">
            Business Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-neutral-850 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-neutral-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Export Bookings CSV</span>
          </button>

          <button
            onClick={adminLogout}
            className="px-3 py-2 bg-red-950/60 hover:bg-red-900 text-red-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-red-800"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-850">
        {[
          { id: 'overview', label: 'Overview & KPIs', icon: Calendar },
          { id: 'bookings', label: `Reservations (${bookings.length})`, icon: Calendar },
          { id: 'quotations', label: `Group Quotes (${quotations.length}) & Tariffs`, icon: Users },
          { id: 'fleet', label: `Fleet Inventory (${vehicles.length})`, icon: Car },
          { id: 'pricing', label: 'Tariff Management', icon: DollarSign },
          { id: 'enquiries', label: `Inquiries (${enquiries.length})`, icon: MessageSquare },
          { id: 'reviews', label: `Reviews (${reviews.length})`, icon: CheckCircle },
          { id: 'payments', label: `M-Pesa Logs (${mpesaLogs.length})`, icon: CreditCard },
          { id: 'database', label: 'Supabase PostgreSQL DDL', icon: Database },
          { id: 'golive', label: 'Go-Live Guide (Real Money & .com)', icon: ShieldCheck },
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                active 
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black shadow' 
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* --- TAB 1: OVERVIEW & KPIS --- */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0F141D] border border-neutral-800 p-5 rounded-2xl space-y-1">
              <span className="text-[11px] text-neutral-400 uppercase font-semibold">Total Revenue Forecast</span>
              <p className="text-2xl font-black text-[#D4AF37] font-mono">
                KSh {totalRevenueKsh.toLocaleString()}
              </p>
              <span className="text-[10px] text-emerald-400">
                Paid: KSh {paidRevenueKsh.toLocaleString()}
              </span>
            </div>

            <div className="bg-[#0F141D] border border-neutral-800 p-5 rounded-2xl space-y-1">
              <span className="text-[11px] text-neutral-400 uppercase font-semibold">Pending Confirmation</span>
              <p className="text-2xl font-black text-amber-400 font-mono">
                {pendingCount}
              </p>
              <span className="text-[10px] text-neutral-400">Requires dispatcher review</span>
            </div>

            <div className="bg-[#0F141D] border border-neutral-800 p-5 rounded-2xl space-y-1">
              <span className="text-[11px] text-neutral-400 uppercase font-semibold">Confirmed & Staged</span>
              <p className="text-2xl font-black text-emerald-400 font-mono">
                {confirmedCount}
              </p>
              <span className="text-[10px] text-neutral-400">Locked in zero-overlap schedule</span>
            </div>

            <div className="bg-[#0F141D] border border-neutral-800 p-5 rounded-2xl space-y-1">
              <span className="text-[11px] text-neutral-400 uppercase font-semibold">Active Fleet Units</span>
              <p className="text-2xl font-black text-white font-mono">
                {vehicles.filter(v => v.isAvailable).length} / {vehicles.length}
              </p>
              <span className="text-[10px] text-neutral-400">Roadworthy & ready</span>
            </div>
          </div>

          {/* Recent Reservations Table Preview */}
          <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-bold text-white font-display">Recent Reservation Activity</h3>
              <button
                onClick={() => setActiveTab('bookings')}
                className="text-xs text-[#D4AF37] hover:underline"
              >
                View all reservations →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-neutral-400 border-b border-neutral-850">
                    <th className="pb-2.5 font-semibold">Ref</th>
                    <th className="pb-2.5 font-semibold">Customer</th>
                    <th className="pb-2.5 font-semibold">Vehicle</th>
                    <th className="pb-2.5 font-semibold">Dates</th>
                    <th className="pb-2.5 font-semibold">Total (KSh)</th>
                    <th className="pb-2.5 font-semibold">Status</th>
                    <th className="pb-2.5 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-850">
                  {bookings.slice(0, 5).map(b => (
                    <tr key={b.id} className="hover:bg-neutral-900/40">
                      <td className="py-3 font-mono font-bold text-[#D4AF37]">{b.reference}</td>
                      <td className="py-3">
                        <p className="font-semibold text-white">{b.customerName}</p>
                        <p className="text-[10px] text-neutral-400">{b.customerPhone}</p>
                      </td>
                      <td className="py-3 text-neutral-300">{b.vehicleName}</td>
                      <td className="py-3 text-neutral-400">
                        {b.pickupDate} to {b.returnDate} ({b.rentalDays}d)
                      </td>
                      <td className="py-3 font-mono font-bold text-white">
                        KSh {b.totalCostKsh.toLocaleString()}
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                          b.status === 'Pending' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                          'bg-neutral-800 text-neutral-300'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => openVoucherModal(b)}
                          className="px-2.5 py-1 bg-neutral-800 hover:bg-[#D4AF37] hover:text-black rounded text-[10px] font-semibold transition-colors"
                        >
                          Voucher
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* --- TAB 2: BOOKINGS MANAGEMENT --- */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          
          {/* Controls: Search and Status Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[#0F141D] rounded-xl border border-neutral-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search reference, customer, or vehicle..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs">
              <span className="text-neutral-400 whitespace-nowrap">Filter Status:</span>
              {['All', 'Pending', 'Confirmed', 'In progress', 'Completed', 'Cancelled'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    statusFilter === st
                      ? 'bg-[#D4AF37] text-black font-bold'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings Full Table */}
          <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-neutral-400 bg-neutral-950 border-b border-neutral-800">
                    <th className="p-3.5 font-semibold">Reference</th>
                    <th className="p-3.5 font-semibold">Customer Details</th>
                    <th className="p-3.5 font-semibold">Vehicle & Mode</th>
                    <th className="p-3.5 font-semibold">Route & Schedule</th>
                    <th className="p-3.5 font-semibold">Total / Payment</th>
                    <th className="p-3.5 font-semibold">Status Management</th>
                    <th className="p-3.5 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-850">
                  {filteredBookings.map(b => (
                    <tr key={b.id} className="hover:bg-neutral-900/40">
                      
                      <td className="p-3.5 align-top">
                        <span className="font-mono font-bold text-sm text-[#D4AF37] block">
                          {b.reference}
                        </span>
                        <span className="text-[10px] text-neutral-500 block mt-0.5">
                          {new Date(b.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="p-3.5 align-top">
                        <p className="font-bold text-white text-xs">{b.customerName}</p>
                        <p className="text-neutral-400 text-[11px]">{b.customerPhone}</p>
                        <p className="text-neutral-500 text-[10px] truncate max-w-[150px]">{b.customerEmail}</p>
                        <span className="text-[10px] text-neutral-400 mt-1 block">Guests: {b.passengers}</span>
                      </td>

                      <td className="p-3.5 align-top">
                        <p className="font-semibold text-white">{b.vehicleName}</p>
                        <span className="text-[10px] text-[#D4AF37]">{b.vehicleCategory}</span>
                        <p className="text-[10px] text-neutral-400 mt-0.5">
                          {b.serviceType} {b.chauffeurIncluded ? '(Chauffeur)' : '(Self-drive)'}
                        </p>
                      </td>

                      <td className="p-3.5 align-top">
                        <div className="space-y-0.5 text-[11px]">
                          <p className="text-neutral-300">
                            <strong>From:</strong> {b.pickupLocation}
                          </p>
                          <p className="text-neutral-300">
                            <strong>To:</strong> {b.destination}
                          </p>
                          <p className="text-neutral-400 font-mono text-[10px]">
                            {b.pickupDate} ({b.pickupTime}) → {b.returnDate}
                          </p>
                        </div>
                      </td>

                      <td className="p-3.5 align-top">
                        <span className="font-mono font-bold text-sm text-white block">
                          KSh {b.totalCostKsh.toLocaleString()}
                        </span>
                        <div className="mt-1">
                          <select
                            value={b.paymentStatus}
                            onChange={(e) => handleUpdatePayment(b.id, e.target.value as any)}
                            className={`p-1 rounded text-[10px] font-semibold border ${
                              b.paymentStatus.startsWith('Paid')
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                                : 'bg-red-950 text-red-300 border-red-800'
                            }`}
                          >
                            <option value="Unpaid">Unpaid</option>
                            <option value="Pending STK">Pending STK</option>
                            <option value="Paid - M-Pesa">Paid - M-Pesa</option>
                            <option value="Paid - Card">Paid - Card</option>
                            <option value="Paid - Cash on Delivery">Paid - Cash</option>
                          </select>
                        </div>
                      </td>

                      <td className="p-3.5 align-top">
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateStatus(b.id, e.target.value as BookingStatus)}
                          className="p-1.5 bg-neutral-950 border border-neutral-700 rounded text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In progress">In progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="p-3.5 align-top text-right space-y-1">
                        <button
                          onClick={() => openVoucherModal(b)}
                          className="px-2.5 py-1 bg-neutral-850 hover:bg-[#D4AF37] hover:text-black rounded text-[10px] font-semibold transition-colors block ml-auto"
                        >
                          Voucher
                        </button>
                        {b.paymentStatus !== 'Paid - M-Pesa' && (
                          <button
                            onClick={() => openMpesaModal(b.reference, b.totalCostKsh, b.customerPhone)}
                            className="px-2 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 rounded text-[10px] font-semibold block ml-auto"
                          >
                            Trigger STK
                          </button>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredBookings.length === 0 && (
              <div className="p-8 text-center text-neutral-400 text-xs">
                No reservations found matching current filter criteria.
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TAB: GROUP QUOTATIONS & ROUTE TARIFFS --- */}
      {activeTab === 'quotations' && (
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-800">
            <div>
              <h3 className="text-lg font-bold text-white font-display">Group Quotations & Baseline Tariffs</h3>
              <p className="text-xs text-neutral-400">Review multi-leg group requests, per-person rates, and manage route pricing tariffs.</p>
            </div>
            <span className="text-xs text-amber-400 font-medium">Estimates subject to confirmation by M07</span>
          </div>

          {/* Submitted Quotations Section */}
          <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Customer Group Quotation Requests ({quotations.length})
            </h4>

            {quotations.length === 0 ? (
              <div className="p-8 text-center text-neutral-400 text-xs">
                No group quotations submitted yet. When customers submit requests on the /quotation page, they appear here.
              </div>
            ) : (
              <div className="space-y-4">
                {quotations.map(q => (
                  <div key={q.id} className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-neutral-850">
                      <div>
                        <span className="font-mono text-xs font-bold text-emerald-400 mr-2">{q.reference}</span>
                        <span className="text-white font-bold text-sm">{q.clientName}</span>
                        {q.organization && <span className="text-neutral-400 text-xs ml-1">({q.organization})</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          q.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400' :
                          q.status === 'Reviewed' ? 'bg-sky-950 text-sky-400' : 'bg-amber-950 text-amber-400'
                        }`}>
                          {q.status}
                        </span>
                        <select
                          value={q.status}
                          onChange={(e) => {
                            dataService.updateGroupQuotationStatus(q.id, e.target.value as any);
                            refreshData();
                          }}
                          className="bg-neutral-900 border border-neutral-700 text-neutral-300 text-[11px] rounded px-2 py-1"
                        >
                          <option value="Submitted">Submitted</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="Confirmed">Confirmed</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-neutral-500 block">Phone:</span>
                        <a href={`tel:${q.phone}`} className="text-neutral-200 hover:text-white font-medium">{q.phone}</a>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Passengers:</span>
                        <span className="text-white font-bold">{q.passengers} Pax</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Total Estimate:</span>
                        <span className="text-amber-400 font-bold font-mono">KSh {q.totalEstimateKsh.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Per Person:</span>
                        <span className="text-emerald-400 font-bold font-mono">KSh {q.perPersonKsh.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Legs list */}
                    <div className="pt-2 border-t border-neutral-850/60 text-xs space-y-1">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">Itinerary Legs ({q.legs.length}):</span>
                      {q.legs.map((leg, idx) => (
                        <div key={leg.id} className="flex justify-between items-center text-neutral-300 bg-neutral-900/60 p-2 rounded">
                          <span>
                            {idx + 1}. <strong>{leg.pickup}</strong> ➔ <strong>{leg.destination}</strong> ({leg.date}, {leg.serviceType})
                          </span>
                          <span className="font-mono text-amber-300 font-bold">KSh {Number(leg.estimatedPriceKsh).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    {q.specialRequests && (
                      <p className="text-xs text-neutral-400 italic bg-neutral-900/40 p-2 rounded">
                        Notes: {q.specialRequests}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Admin-Editable Route Tariffs Table */}
          <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-800">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  Admin-Editable Route Tariffs ({routeTariffs.length})
                </h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  These baseline tariffs populate auto-estimates on the public Group Quotation builder.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-neutral-400 bg-neutral-950 border-b border-neutral-800">
                    <th className="p-3 font-semibold">Origin</th>
                    <th className="p-3 font-semibold">Destination</th>
                    <th className="p-3 font-semibold">Service Type</th>
                    <th className="p-3 font-semibold">Vehicle</th>
                    <th className="p-3 font-semibold">Tariff (KSh)</th>
                    <th className="p-3 font-semibold">Notes</th>
                    <th className="p-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-850">
                  {routeTariffs.map(t => {
                    const isEditing = editingTariffId === t.id;
                    return (
                      <tr key={t.id} className="hover:bg-neutral-900/40">
                        <td className="p-3 font-medium text-white">{t.from}</td>
                        <td className="p-3 font-medium text-white">{t.to}</td>
                        <td className="p-3 text-sky-400">{t.serviceType}</td>
                        <td className="p-3 text-neutral-300">{t.vehicleType}</td>
                        <td className="p-3 font-mono font-bold text-amber-400">
                          {isEditing ? (
                            <input
                              type="number"
                              value={tariffPriceInput}
                              onChange={(e) => setTariffPriceInput(parseInt(e.target.value) || 0)}
                              className="w-24 bg-neutral-900 border border-neutral-700 px-2 py-1 rounded text-amber-400"
                            />
                          ) : (
                            `KSh ${t.priceKsh.toLocaleString()}`
                          )}
                        </td>
                        <td className="p-3 text-neutral-400 max-w-xs truncate">
                          {isEditing ? (
                            <input
                              type="text"
                              value={tariffNotesInput}
                              onChange={(e) => setTariffNotesInput(e.target.value)}
                              className="w-full bg-neutral-900 border border-neutral-700 px-2 py-1 rounded text-neutral-200"
                            />
                          ) : (
                            t.notes || '—'
                          )}
                        </td>
                        <td className="p-3">
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  dataService.updateRouteTariff(t.id, tariffPriceInput, tariffNotesInput);
                                  setEditingTariffId(null);
                                  refreshData();
                                }}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingTariffId(null)}
                                className="px-2 py-1 text-neutral-400 hover:text-white text-[11px]"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingTariffId(t.id);
                                setTariffPriceInput(t.priceKsh);
                                setTariffNotesInput(t.notes || '');
                              }}
                              className="px-2.5 py-1 bg-neutral-800 hover:bg-[#D4AF37] hover:text-black rounded text-[11px] font-semibold text-neutral-200 transition-colors"
                            >
                              Edit Price
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: FLEET INVENTORY --- */}
      {activeTab === 'fleet' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className="text-lg font-bold text-white font-display">Active Vehicles & Capacity</h3>
              <p className="text-xs text-neutral-400">Update pricing, specs, availability, and photographic assets.</p>
            </div>
            <button
              onClick={handleOpenAddVehicle}
              className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-bold text-xs rounded-lg flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vehicle to Fleet</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map(veh => (
              <div
                key={veh.id}
                className="bg-[#0F141D] border border-neutral-800 rounded-2xl overflow-hidden p-5 space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative h-44 rounded-xl overflow-hidden bg-neutral-950">
                    <img
                      src={veh.image}
                      alt={veh.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] text-[#D4AF37] font-bold">
                      {veh.category}
                    </div>
                    <div className="absolute top-2 right-2">
                      <button
                        onClick={() => handleToggleAvail(veh.id)}
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                          veh.isAvailable 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' 
                            : 'bg-red-950 text-red-300 border border-red-800'
                        }`}
                      >
                        {veh.isAvailable ? 'Active' : 'Offline'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white">{veh.name}</h4>
                    <p className="text-xs text-neutral-400 mt-0.5 line-clamp-2">{veh.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-neutral-850">
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Daily Rate</span>
                      <span className="font-mono font-bold text-[#D4AF37]">KSh {veh.pricePerDay.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Chauffeur Rate</span>
                      <span className="font-mono font-bold text-white">+KSh {veh.chauffeurDailyRate.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-neutral-400 flex items-center gap-3">
                    <span>{veh.seats} Seats</span>
                    <span>·</span>
                    <span>{veh.transmission}</span>
                    <span>·</span>
                    <span>{veh.fuelType}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-neutral-850">
                  <button
                    onClick={() => handleOpenEditVehicle(veh)}
                    className="flex-1 py-1.5 bg-neutral-850 hover:bg-neutral-800 text-white rounded text-xs font-medium flex items-center justify-center gap-1 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Edit Vehicle</span>
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(veh.id)}
                    className="p-1.5 bg-red-950/60 hover:bg-red-900 text-red-300 rounded text-xs transition-colors"
                    title="Remove from fleet"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 4: PRICING MANAGEMENT --- */}
      {activeTab === 'pricing' && (
        <div className="space-y-6">
          <div className="pb-2">
            <h3 className="text-lg font-bold text-white font-display">Tariff & Rate Architecture</h3>
            <p className="text-xs text-neutral-400">
              M07 original rate benchmarks. Update rates across all vehicle categories to reflect seasonal coastal adjustments.
            </p>
          </div>

          <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-neutral-400 border-b border-neutral-800">
                    <th className="pb-3 font-semibold">Category</th>
                    <th className="pb-3 font-semibold">Official M07 Rate</th>
                    <th className="pb-3 font-semibold">Weekly Discounted Rate</th>
                    <th className="pb-3 font-semibold">Chauffeur Allowance</th>
                    <th className="pb-3 text-right font-semibold">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-850">
                  {[
                    { cat: 'Small cars', base: 3500, weekly: 3200, chf: 2000 },
                    { cat: 'Noah/Voxy/Serena', base: 7000, weekly: 6500, chf: 2500 },
                    { cat: 'Double cabins', base: 9000, weekly: 8500, chf: 2500 },
                    { cat: 'RAV4', base: 7000, weekly: 6500, chf: 2500 },
                    { cat: 'Prado', base: 15000, weekly: 14000, chf: 3000 },
                    { cat: 'Land Cruiser', base: 28000, weekly: 26000, chf: 3500 },
                    { cat: 'Passenger vans', base: 12000, weekly: 11000, chf: 2500 },
                  ].map((tier, idx) => (
                    <tr key={idx} className="hover:bg-neutral-900/40">
                      <td className="py-3 font-bold text-white">{tier.cat}</td>
                      <td className="py-3 font-mono font-bold text-[#D4AF37]">KSh {tier.base.toLocaleString()} / day</td>
                      <td className="py-3 font-mono text-neutral-300">KSh {tier.weekly.toLocaleString()} / day</td>
                      <td className="py-3 font-mono text-neutral-400">+KSh {tier.chf.toLocaleString()} / day</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => {
                            const match = vehicles.find(v => v.category === tier.cat);
                            if (match) handleOpenEditVehicle(match);
                          }}
                          className="px-2.5 py-1 bg-neutral-800 hover:bg-[#D4AF37] hover:text-black rounded text-[10px] font-semibold transition-colors"
                        >
                          Adjust Tariff
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 5: CUSTOMER ENQUIRIES --- */}
      {activeTab === 'enquiries' && (
        <div className="space-y-6">
          <div className="pb-2">
            <h3 className="text-lg font-bold text-white font-display">Customer Enquiries Inbox</h3>
            <p className="text-xs text-neutral-400">Incoming messages from the contact page and corporate inquiries.</p>
          </div>

          <div className="space-y-4">
            {enquiries.map(enq => (
              <div
                key={enq.id}
                className="bg-[#0F141D] border border-neutral-800 p-5 rounded-2xl space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-neutral-850">
                  <div>
                    <h4 className="text-sm font-bold text-white">{enq.subject}</h4>
                    <p className="text-xs text-neutral-400">
                      From: <strong className="text-neutral-200">{enq.name}</strong> ({enq.email} · {enq.phone})
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      enq.status === 'New' ? 'bg-amber-950 text-amber-400' : 'bg-emerald-950 text-emerald-400'
                    }`}>
                      {enq.status}
                    </span>
                    <button
                      onClick={() => {
                        dataService.updateEnquiryStatus(enq.id, enq.status === 'New' ? 'Replied' : 'Closed');
                        refreshData();
                      }}
                      className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-[10px]"
                    >
                      Toggle Status
                    </button>
                  </div>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">{enq.message}</p>

                <div className="flex items-center gap-4 text-xs pt-2">
                  <a
                    href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${enq.name}, this is M07 Msanifu Zero Seven regarding your inquiry.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    Reply on WhatsApp
                  </a>
                  <a
                    href={`mailto:${enq.email}?subject=RE: ${enq.subject}`}
                    className="text-[#D4AF37] hover:underline"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ))}

            {enquiries.length === 0 && (
              <div className="p-8 text-center bg-[#0F141D] rounded-2xl border border-neutral-800 text-neutral-400 text-xs">
                No customer inquiries received yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TAB 6: REVIEW MODERATION --- */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="pb-2">
            <h3 className="text-lg font-bold text-white font-display">Client Reviews Moderation</h3>
            <p className="text-xs text-neutral-400">Only verified, approved reviews are rendered on the public website.</p>
          </div>

          <div className="space-y-4">
            {reviews.map(rev => (
              <div
                key={rev.id}
                className="bg-[#0F141D] border border-neutral-800 p-5 rounded-2xl space-y-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{rev.author}</span>
                    <span className="text-xs text-neutral-500">({rev.location})</span>
                    <span className="text-xs text-[#D4AF37]">★ {rev.rating}/5</span>
                  </div>
                  <p className="text-xs text-neutral-300 italic">"{rev.comment}"</p>
                  <p className="text-[10px] text-neutral-500">Vehicle: {rev.vehicleHired} · {rev.date}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                    rev.approved ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400'
                  }`}>
                    {rev.approved ? 'Approved' : 'Pending'}
                  </span>
                  <button
                    onClick={() => {
                      dataService.toggleReviewApproval(rev.id);
                      refreshData();
                    }}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-[#D4AF37] hover:text-black rounded text-xs font-semibold transition-colors"
                  >
                    {rev.approved ? 'Revoke' : 'Approve'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 7: M-PESA & PAYMENT LOGS --- */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          <div className="pb-2">
            <h3 className="text-lg font-bold text-white font-display">Lipa Na M-Pesa & Card Transaction Audit</h3>
            <p className="text-xs text-neutral-400">Live transaction logs from Safaricom Daraja STK Gateway.</p>
          </div>

          <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-neutral-400 bg-neutral-950 border-b border-neutral-800">
                    <th className="p-3.5 font-semibold">Receipt Number</th>
                    <th className="p-3.5 font-semibold">Booking Ref</th>
                    <th className="p-3.5 font-semibold">Phone Number</th>
                    <th className="p-3.5 font-semibold">Amount (KSh)</th>
                    <th className="p-3.5 font-semibold">Status</th>
                    <th className="p-3.5 font-semibold">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-850">
                  {mpesaLogs.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-neutral-900/40">
                      <td className="p-3.5 font-mono font-bold text-emerald-400">{tx.receiptNumber}</td>
                      <td className="p-3.5 font-mono text-white">{tx.bookingReference}</td>
                      <td className="p-3.5 text-neutral-300">{tx.phoneNumber}</td>
                      <td className="p-3.5 font-mono font-bold text-[#D4AF37]">KSh {tx.amount.toLocaleString()}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold">
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-neutral-400 text-[11px]">{new Date(tx.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {mpesaLogs.length === 0 && (
              <div className="p-8 text-center text-neutral-400 text-xs">
                No direct M-Pesa transactions logged yet. Use the "Pay via M-Pesa" button in any reservation to simulate an STK push!
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TAB 8: SUPABASE POSTGRESQL DDL --- */}
      {activeTab === 'database' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h3 className="text-lg font-bold text-white font-display">Supabase PostgreSQL Architecture & RLS</h3>
              <p className="text-xs text-neutral-400">
                Complete database schema with tables, enums, indices, and Row Level Security policies.
              </p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(dataService.generateSupabaseSchemaSQL());
                setCopiedSql(true);
                setTimeout(() => setCopiedSql(false), 2000);
              }}
              className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-black font-bold text-xs rounded-lg flex items-center gap-1.5 shadow"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Schema'}</span>
            </button>
          </div>

          <div className="bg-[#080B10] border border-neutral-800 rounded-2xl p-6 font-mono text-xs text-emerald-300 overflow-x-auto shadow-2xl">
            <pre>{dataService.generateSupabaseSchemaSQL()}</pre>
          </div>
        </div>
      )}

      {/* --- TAB 9: GO-LIVE & PRODUCTION GUIDE (REAL MONEY & .COM DOMAIN) --- */}
      {activeTab === 'golive' && (
        <div className="space-y-8 text-xs text-neutral-300">
          <div className="pb-3 border-b border-neutral-800">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Production Deployment Blueprint
            </span>
            <h3 className="text-2xl font-bold text-white font-display mt-1">
              How to Connect Real Money, Real Bookings & Your .com Domain
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              The straightforward, legal roadmap to make M07 an active commercial enterprise in Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Step 1: Real Money */}
            <div className="bg-[#0F141D] border border-[#D4AF37]/30 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-base">
                1
              </div>
              <h4 className="text-base font-bold text-white">Real Money (Safaricom STK Push)</h4>
              <p className="text-neutral-400 leading-relaxed text-[11px]">
                To have customers receive the real prompt on their phone handset and deduct real Kenya Shillings into your bank/till:
              </p>
              
              <ol className="list-decimal pl-4 space-y-2 text-[11px] text-neutral-300">
                <li>
                  <strong>Get a Lipa Na M-Pesa Till or Paybill:</strong> Apply through Safaricom Business portal or your local Safaricom Shop (Nyali/Mombasa CBD) using your National ID and Business Certificate.
                </li>
                <li>
                  <strong>Create a Safaricom Daraja Developer Account:</strong> Visit <a href="https://developer.safaricom.co.ke" target="_blank" rel="noreferrer" className="text-[#D4AF37] underline">developer.safaricom.co.ke</a> and click <em>Create an App</em>.
                </li>
                <li>
                  <strong>Copy 4 Keys:</strong> Consumer Key, Consumer Secret, Passkey, and Shortcode (Till/Paybill).
                </li>
                <li>
                  <strong>Paste into Vercel Settings:</strong> In your Vercel Dashboard, go to <em>Settings &gt; Environment Variables</em> and add:
                  <div className="bg-neutral-950 p-2 rounded border border-neutral-800 font-mono text-[10px] text-emerald-400 mt-1 space-y-0.5">
                    <p>MPESA_ENVIRONMENT = production</p>
                    <p>MPESA_CONSUMER_KEY = your_key</p>
                    <p>MPESA_CONSUMER_SECRET = your_secret</p>
                    <p>MPESA_PASSKEY = your_passkey</p>
                    <p>MPESA_SHORTCODE = 807007</p>
                  </div>
                </li>
                <li>
                  <strong>Already Integrated:</strong> The file <code className="text-white">/api/mpesa/stkpush.ts</code> in this project is already written to immediately invoke Safaricom's real API the moment those keys exist!
                </li>
              </ol>
            </div>

            {/* Step 2: Real Cloud Database */}
            <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-base">
                2
              </div>
              <h4 className="text-base font-bold text-white">Real Cloud Database (Supabase)</h4>
              <p className="text-neutral-400 leading-relaxed text-[11px]">
                To ensure bookings are saved permanently in a secure cloud database rather than local browser storage:
              </p>

              <ol className="list-decimal pl-4 space-y-2 text-[11px] text-neutral-300">
                <li>
                  <strong>Create Free Project:</strong> Go to <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-[#D4AF37] underline">supabase.com</a> and create a new project in region <em>South Africa (Johannesburg)</em> or <em>Europe (Frankfurt)</em> for fastest Kenya latency.
                </li>
                <li>
                  <strong>Run the Schema SQL:</strong> Go to the <em>Supabase PostgreSQL DDL</em> tab in this dashboard, click <strong>Copy SQL Schema</strong>, paste it into the Supabase <em>SQL Editor</em> and click <strong>Run</strong>. All tables and RLS security policies are created in 3 seconds.
                </li>
                <li>
                  <strong>Add Supabase Keys in Vercel:</strong>
                  <div className="bg-neutral-950 p-2 rounded border border-neutral-800 font-mono text-[10px] text-blue-400 mt-1 space-y-0.5">
                    <p>VITE_SUPABASE_URL = https://xyz.supabase.co</p>
                    <p>VITE_SUPABASE_ANON_KEY = eyJhbG...</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Step 3: .com Domain */}
            <div className="bg-[#0F141D] border border-neutral-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-bold text-base">
                3
              </div>
              <h4 className="text-base font-bold text-white">Your .com Domain</h4>
              <p className="text-neutral-400 leading-relaxed text-[11px]">
                To replace the vercel.app link with your official custom brand name (e.g. <strong>m07carhire.com</strong> or <strong>msanifuzeroseven.com</strong>):
              </p>

              <ol className="list-decimal pl-4 space-y-2 text-[11px] text-neutral-300">
                <li>
                  <strong>Buy Domain (~$10/year):</strong> On Namecheap, GoDaddy, HostPinnacle, or Truehost Kenya, search for <code className="text-white">m07carhire.com</code> or <code className="text-white">msanifuzeroseven.com</code>.
                </li>
                <li>
                  <strong>Add to Vercel:</strong> In your Vercel project, go to <em>Settings &gt; Domains</em>, type your domain (e.g. <code className="text-white">m07carhire.com</code>) and click <strong>Add</strong>.
                </li>
                <li>
                  <strong>Point DNS Records:</strong> In your domain registrar DNS manager, add these 2 records:
                  <div className="bg-neutral-950 p-2.5 rounded border border-neutral-800 font-mono text-[10px] text-amber-300 mt-1 space-y-1">
                    <p>Type: <strong>A</strong> | Host: <strong>@</strong> | Value: <strong>76.76.21.21</strong></p>
                    <p>Type: <strong>CNAME</strong> | Host: <strong>www</strong> | Value: <strong>cname.vercel-dns.com</strong></p>
                  </div>
                </li>
                <li>
                  <strong>Automatic SSL:</strong> Vercel automatically activates free HTTPS encryption within 5–10 minutes!
                </li>
              </ol>
            </div>

          </div>

          {/* Instant Dispatch Alerting Banner */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-sm font-bold text-white">Direct WhatsApp Dispatch Notification</h4>
              <p className="text-[11px] text-neutral-400">
                Whenever a client completes a reservation, clicking the <em>WhatsApp Dispatch</em> button sends the customer's full voucher directly to <strong>+254 729 255 154</strong>.
              </p>
            </div>
            <a
              href="https://wa.me/254729255154"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold whitespace-nowrap shadow"
            >
              Test WhatsApp Hotline (+254 729 255 154)
            </a>
          </div>
        </div>
      )}

      {/* --- VEHICLE ADD / EDIT MODAL --- */}
      {vehicleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0F141D] border border-[#D4AF37]/40 rounded-2xl max-w-xl w-full p-6 space-y-4 my-8 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-bold text-white">
                {editingVehicle ? 'Edit Vehicle Specifications' : 'Add New Vehicle to Fleet'}
              </h3>
              <button onClick={() => setVehicleModalOpen(false)} className="text-neutral-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVehicle} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Vehicle Name & Model *</label>
                <input
                  type="text"
                  required
                  value={vehFormData.name}
                  onChange={(e) => setVehFormData({ ...vehFormData, name: e.target.value })}
                  placeholder="e.g. Toyota Land Cruiser Prado TX"
                  className="w-full p-2 bg-neutral-950 border border-neutral-700 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Category *</label>
                  <select
                    value={vehFormData.category}
                    onChange={(e) => setVehFormData({ ...vehFormData, category: e.target.value as any })}
                    className="w-full p-2 bg-neutral-950 border border-neutral-700 rounded text-white"
                  >
                    <option value="Small cars">Small cars (KSh 3,500)</option>
                    <option value="Noah/Voxy/Serena">Noah/Voxy/Serena (KSh 6k-8k)</option>
                    <option value="Double cabins">Double cabins (KSh 9,000)</option>
                    <option value="RAV4">RAV4 (KSh 7,000)</option>
                    <option value="Prado">Prado (KSh 15,000)</option>
                    <option value="Land Cruiser">Land Cruiser (KSh 28,000)</option>
                    <option value="Passenger vans">Passenger vans (KSh 9k-18k)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Model Year</label>
                  <input
                    type="number"
                    value={vehFormData.modelYear}
                    onChange={(e) => setVehFormData({ ...vehFormData, modelYear: Number(e.target.value) })}
                    className="w-full p-2 bg-neutral-950 border border-neutral-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Daily Rate (KSh) *</label>
                  <input
                    type="number"
                    required
                    value={vehFormData.pricePerDay}
                    onChange={(e) => setVehFormData({ ...vehFormData, pricePerDay: Number(e.target.value) })}
                    className="w-full p-2 bg-neutral-950 border border-neutral-700 rounded text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Weekly Daily (KSh)</label>
                  <input
                    type="number"
                    value={vehFormData.pricePerDayWeekly}
                    onChange={(e) => setVehFormData({ ...vehFormData, pricePerDayWeekly: Number(e.target.value) })}
                    className="w-full p-2 bg-neutral-950 border border-neutral-700 rounded text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Chauffeur Rate (KSh)</label>
                  <input
                    type="number"
                    value={vehFormData.chauffeurDailyRate}
                    onChange={(e) => setVehFormData({ ...vehFormData, chauffeurDailyRate: Number(e.target.value) })}
                    className="w-full p-2 bg-neutral-950 border border-neutral-700 rounded text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Transmission</label>
                  <select
                    value={vehFormData.transmission}
                    onChange={(e) => setVehFormData({ ...vehFormData, transmission: e.target.value as any })}
                    className="w-full p-2 bg-neutral-950 border border-neutral-700 rounded text-white"
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Fuel Type</label>
                  <select
                    value={vehFormData.fuelType}
                    onChange={(e) => setVehFormData({ ...vehFormData, fuelType: e.target.value as any })}
                    className="w-full p-2 bg-neutral-950 border border-neutral-700 rounded text-white"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Seats</label>
                  <input
                    type="number"
                    value={vehFormData.seats}
                    onChange={(e) => setVehFormData({ ...vehFormData, seats: Number(e.target.value) })}
                    className="w-full p-2 bg-neutral-950 border border-neutral-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Bags</label>
                  <input
                    type="number"
                    value={vehFormData.luggageCapacity}
                    onChange={(e) => setVehFormData({ ...vehFormData, luggageCapacity: Number(e.target.value) })}
                    className="w-full p-2 bg-neutral-950 border border-neutral-700 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Photograph Image URL *</label>
                <input
                  type="text"
                  required
                  value={vehFormData.image}
                  onChange={(e) => setVehFormData({ ...vehFormData, image: e.target.value })}
                  placeholder="/images/... or https://..."
                  className="w-full p-2 bg-neutral-950 border border-neutral-700 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Description</label>
                <textarea
                  rows={2}
                  value={vehFormData.description}
                  onChange={(e) => setVehFormData({ ...vehFormData, description: e.target.value })}
                  className="w-full p-2 bg-neutral-950 border border-neutral-700 rounded text-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Features (Comma Separated)</label>
                <input
                  type="text"
                  value={vehFormData.featuresText}
                  onChange={(e) => setVehFormData({ ...vehFormData, featuresText: e.target.value })}
                  placeholder="Dual AC, Reverse Camera, Cool Box"
                  className="w-full p-2 bg-neutral-950 border border-neutral-700 rounded text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="availCheck"
                  checked={vehFormData.isAvailable}
                  onChange={(e) => setVehFormData({ ...vehFormData, isAvailable: e.target.checked })}
                  className="accent-[#D4AF37]"
                />
                <label htmlFor="availCheck" className="text-white cursor-pointer font-medium">
                  Vehicle is active and available for public booking
                </label>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setVehicleModalOpen(false)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#D4AF37] hover:bg-[#AA820A] text-black font-bold rounded text-xs"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
