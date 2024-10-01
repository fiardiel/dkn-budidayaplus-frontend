import { render, screen, fireEvent, act } from '@testing-library/react';
import { Sidebar } from '@/components/sidebar';
import { useUser } from '@/hooks/useUser';
import { logout } from '@/lib/auth/logout/logoutAction';

jest.mock('@/hooks/useUser');
const mockUseUser = useUser as jest.Mock;

jest.mock('@/lib/auth/logout/logoutAction', () => ({
  logout: jest.fn()
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('Sidebar', () => {

  beforeEach(() => {
    mockUseUser.mockReturnValue({
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      phone_number: '081234567890'
    });
    render(<Sidebar />);
  })

  it('Should render sidebar with correct menus', () => {    
    const sidebarTrigger = screen.getByRole('button', { name: /sidebar trigger/i })
    expect(sidebarTrigger).toBeInTheDocument()
    fireEvent.click(sidebarTrigger)

    const sidebar = screen.getByRole('dialog')
    const userFullName = screen.getByText((_, element) => element?.textContent === 'John Doe')
    const avatar = screen.getByTestId('avatar')
    const homeMenu = screen.getByText('Home')
    const profileMenu = screen.getByText('Profile')
    const taskMenu = screen.getByText('Task')
    const pondMenu = screen.getByText('Pond')
    const logoutMenu = screen.getByText('Logout')

    expect(sidebar).toBeInTheDocument()
    expect(userFullName).toBeInTheDocument()
    expect(avatar).toBeInTheDocument()
    expect(homeMenu).toBeInTheDocument()
    expect(profileMenu).toBeInTheDocument()
    expect(taskMenu).toBeInTheDocument()
    expect(pondMenu).toBeInTheDocument()
    expect(logoutMenu).toBeInTheDocument()
  })

  it('Should logout user when the logout menu is clicked', async () => {
    const sidebarTrigger = screen.getByRole('button', { name: /sidebar trigger/i });
    fireEvent.click(sidebarTrigger);

    const logoutMenu = screen.getByText('Logout');
    fireEvent.click(logoutMenu);

    expect(logout).toHaveBeenCalled(); 
  });


  it('does not render user information when user is null', async () => {
    mockUseUser.mockReturnValue(null);
    const sidebarTrigger = screen.getByRole('button', { name: /sidebar trigger/i });
    await act(async () => {
      fireEvent.click(sidebarTrigger);
    })

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.queryByText('Aquaculturist')).not.toBeInTheDocument();
    expect(screen.queryByTestId('avatar')).not.toBeInTheDocument();
  });
})